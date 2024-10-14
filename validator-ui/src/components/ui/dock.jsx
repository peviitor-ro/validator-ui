'use client';

import React, { useRef } from 'react';
import { cva } from 'class-variance-authority';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import { cn } from '../../lib/utils';

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
    'supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto flex h-[58px] w-max lg:gap-2 rounded-2xl border p-2 backdrop-blur-md',
);

/**
 * A React component that renders a dock with magnification effects on its children.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Additional class names for the dock.
 * @param {React.ReactNode} props.children - The children elements to be rendered inside the dock.
 * @param {number} [props.magnification=DEFAULT_MAGNIFICATION] - The magnification level for the dock icons.
 * @param {number} [props.distance=DEFAULT_DISTANCE] - The distance for the magnification effect.
 * @param {string} [props.direction='bottom'] - The direction of the dock ('top', 'middle', 'bottom').
 * @param {React.Ref} ref - The ref to be forwarded to the motion.div element.
 * @returns {React.ReactElement} The rendered dock component.
 */
const Dock = React.forwardRef(
    (
        {
            className,
            children,
            magnification = DEFAULT_MAGNIFICATION,
            distance = DEFAULT_DISTANCE,
            direction = 'bottom',
            ...props
        },
        ref,
    ) => {
        const mouseX = useMotionValue(Infinity);

        const renderChildren = () => {
            return React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === DockIcon) {
                    return React.cloneElement(child, {
                        ...child.props,
                        mouseX: mouseX,
                        magnification: magnification,
                        distance: distance,
                    });
                }
                return child;
            });
        };

        return (
            <motion.div
                ref={ref}
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                {...props}
                className={cn(dockVariants({ className }), {
                    'items-start': direction === 'top',
                    'items-center': direction === 'middle',
                    'items-end': direction === 'bottom',
                })}
            >
                {renderChildren()}
            </motion.div>
        );
    },
);

Dock.displayName = 'Dock';

const DockIcon = ({
    size,
    magnification = DEFAULT_MAGNIFICATION,
    distance = DEFAULT_DISTANCE,
    mouseX,
    className,
    children,
    ...props
}) => {
    const ref = useRef(null);

    const distanceCalc = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(distanceCalc, [-distance, 0, distance], [40, magnification, 40]);

    let width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className={cn(
                'flex aspect-square cursor-pointer items-center justify-center rounded-full hover:text-red-500',
                className,
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

DockIcon.displayName = 'DockIcon';

export { Dock, DockIcon, dockVariants };
