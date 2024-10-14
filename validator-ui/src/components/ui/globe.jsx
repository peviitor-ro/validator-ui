'use client';

import createGlobe from 'cobe';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '../../lib/utils';

/**
 * Configuration object for the Globe component.
 *
 * @typedef {Object} GlobeConfig
 * @property {number} width - The width of the globe.
 * @property {number} height - The height of the globe.
 * @property {Function} onRender - Callback function to be called on render.
 * @property {number} devicePixelRatio - The device pixel ratio.
 * @property {number} phi - The phi angle for the globe's rotation.
 * @property {number} theta - The theta angle for the globe's rotation.
 * @property {number} dark - The darkness level of the globe.
 * @property {number} diffuse - The diffuse lighting level of the globe.
 * @property {number} mapSamples - The number of map samples.
 * @property {number} mapBrightness - The brightness of the map.
 * @property {number[]} baseColor - The base color of the globe in RGB format.
 * @property {number[]} markerColor - The color of the markers in RGB format.
 * @property {number[]} glowColor - The color of the globe's glow in RGB format.
 * @property {Object[]} markers - Array of marker objects.
 * @property {number[]} markers[].location - The latitude and longitude of the marker.
 * @property {number} markers[].size - The size of the marker.
 */
const GLOBE_CONFIG = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1, 1, 1],
    markers: [{ location: [44.4268, 26.1025], size: 0.05 }],
};

/**
 * Globe component renders an interactive globe using a canvas element.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Additional class names for the container div.
 * @param {Object} [props.config=GLOBE_CONFIG] - Configuration object for the globe.
 *
 * @returns {JSX.Element} The rendered Globe component.
 */
export default function Globe({ className, config = GLOBE_CONFIG }) {
    let phi = 0;
    let width = 0;
    const canvasRef = useRef(null);
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);
    const [r, setR] = useState(0);

    const updatePointerInteraction = (value) => {
        pointerInteracting.current = value;
        if (canvasRef.current) {
            canvasRef.current.style.cursor = value ? 'grabbing' : 'grab';
        }
    };

    const updateMovement = (clientX) => {
        if (pointerInteracting.current !== null) {
            const delta = clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            setR(delta / 200);
        }
    };

    const onRender = useCallback(
        (state) => {
            if (!pointerInteracting.current) phi += 0.005;
            state.phi = phi + r;
            state.width = width * 2;
            state.height = width * 2;
        },
        [r],
    );

    const onResize = () => {
        if (canvasRef.current) {
            width = canvasRef.current.offsetWidth;
        }
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();

        if (!canvasRef.current) return;
        const globe = createGlobe(canvasRef.current, {
            ...config,
            width: width * 2,
            height: width * 2,
            onRender,
        });

        setTimeout(() => {
            if (canvasRef.current) {
                canvasRef.current.style.opacity = '1';
            }
        });
        return () => globe.destroy();
    }, []);

    return (
        <div
            className={cn('absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]', className)}
        >
            <canvas
                className={cn(
                    'size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]',
                )}
                ref={canvasRef}
                onPointerDown={(e) =>
                    updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
                }
                onPointerUp={() => updatePointerInteraction(null)}
                onPointerOut={() => updatePointerInteraction(null)}
                onMouseMove={(e) => updateMovement(e.clientX)}
                onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
            />
        </div>
    );
}
