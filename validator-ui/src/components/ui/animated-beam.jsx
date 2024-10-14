import { useEffect, useId, useState } from 'react';
import { motion } from 'framer-motion';

import { cn } from '../../lib/utils';

/**
 * AnimatedBeam component renders an animated SVG beam between two reference points.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Additional class names for the SVG element.
 * @param {React.RefObject} props.containerRef - Reference to the container element.
 * @param {React.RefObject} props.fromRef - Reference to the starting element.
 * @param {React.RefObject} props.toRef - Reference to the ending element.
 * @param {number} [props.curvature=0] - Curvature of the beam path.
 * @param {boolean} [props.reverse=false] - Whether to reverse the gradient direction.
 * @param {number} [props.duration=Math.random() * 3 + 4] - Duration of the gradient animation.
 * @param {number} [props.delay=0] - Delay before the gradient animation starts.
 * @param {string} [props.pathColor='gray'] - Color of the beam path.
 * @param {number} [props.pathWidth=2] - Width of the beam path.
 * @param {number} [props.pathOpacity=0.2] - Opacity of the beam path.
 * @param {string} [props.gradientStartColor='#ffaa40'] - Start color of the gradient.
 * @param {string} [props.gradientStopColor='#9c40ff'] - Stop color of the gradient.
 * @param {number} [props.startXOffset=0] - X offset for the starting point.
 * @param {number} [props.startYOffset=0] - Y offset for the starting point.
 * @param {number} [props.endXOffset=0] - X offset for the ending point.
 * @param {number} [props.endYOffset=0] - Y offset for the ending point.
 * @returns {JSX.Element} The rendered SVG element with the animated beam.
 */
export const AnimatedBeam = ({
    className,
    containerRef,
    fromRef,
    toRef,
    curvature = 0,
    reverse = false, // Include the reverse prop
    duration = Math.random() * 3 + 4,
    delay = 0,
    pathColor = 'gray',
    pathWidth = 2,
    pathOpacity = 0.2,
    gradientStartColor = '#ffaa40',
    gradientStopColor = '#9c40ff',
    startXOffset = 0,
    startYOffset = 0,
    endXOffset = 0,
    endYOffset = 0,
}) => {
    const id = useId();
    const [pathD, setPathD] = useState('');
    const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

    // Calculate the gradient coordinates based on the reverse prop
    const gradientCoordinates = reverse
        ? {
              x1: ['90%', '-10%'],
              x2: ['100%', '0%'],
              y1: ['0%', '0%'],
              y2: ['0%', '0%'],
          }
        : {
              x1: ['10%', '110%'],
              x2: ['0%', '100%'],
              y1: ['0%', '0%'],
              y2: ['0%', '0%'],
          };

    useEffect(() => {
        const updatePath = () => {
            if (containerRef.current && fromRef.current && toRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const rectA = fromRef.current.getBoundingClientRect();
                const rectB = toRef.current.getBoundingClientRect();

                const svgWidth = containerRect.width;
                const svgHeight = containerRect.height;
                setSvgDimensions({ width: svgWidth, height: svgHeight });

                const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
                const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
                const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
                const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

                const controlY = startY - curvature;
                const d = `M ${startX},${startY} Q ${
                    (startX + endX) / 2
                },${controlY} ${endX},${endY}`;
                setPathD(d);
            }
        };

        // Initialize ResizeObserver
        const resizeObserver = new ResizeObserver((entries) => {
            // For all entries, recalculate the path
            for (let entry of entries) {
                updatePath();
            }
        });

        // Observe the container element
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        // Call the updatePath initially to set the initial path
        updatePath();

        // Clean up the observer on component unmount
        return () => {
            resizeObserver.disconnect();
        };
    }, [
        containerRef,
        fromRef,
        toRef,
        curvature,
        startXOffset,
        startYOffset,
        endXOffset,
        endYOffset,
    ]);

    return (
        <svg
            fill="none"
            width={svgDimensions.width}
            height={svgDimensions.height}
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
                'pointer-events-none absolute left-0 top-0 transform-gpu stroke-2',
                className,
            )}
            viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
        >
            <path
                d={pathD}
                stroke={pathColor}
                strokeWidth={pathWidth}
                strokeOpacity={pathOpacity}
                strokeLinecap="round"
            />
            <path
                d={pathD}
                strokeWidth={pathWidth}
                stroke={`url(#${id})`}
                strokeOpacity="1"
                strokeLinecap="round"
            />
            <defs>
                <motion.linearGradient
                    className="transform-gpu"
                    id={id}
                    gradientUnits={'userSpaceOnUse'}
                    initial={{
                        x1: '0%',
                        x2: '0%',
                        y1: '0%',
                        y2: '0%',
                    }}
                    animate={{
                        x1: gradientCoordinates.x1,
                        x2: gradientCoordinates.x2,
                        y1: gradientCoordinates.y1,
                        y2: gradientCoordinates.y2,
                    }}
                    transition={{
                        delay,
                        duration,
                        ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
                        repeat: Infinity,
                        repeatDelay: 0,
                    }}
                >
                    <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
                    <stop stopColor={gradientStartColor}></stop>
                    <stop offset="32.5%" stopColor={gradientStopColor}></stop>
                    <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0"></stop>
                </motion.linearGradient>
            </defs>
        </svg>
    );
};
