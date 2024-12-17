import React, { useRef, forwardRef } from 'react';
import { cn } from '../lib/utils';
import { AnimatedBeam } from './ui/animated-beam';

import account from '../assets/icons/account.png';
import database from '../assets/icons/database.png';
import server from '../assets/icons/server.png';
import servererror from '../assets/icons/servererror.png';
// default values for the animated beam objects
const animatedBeamObjects = {
    user: {
        name: 'user',
        icon: account,
        position: 'left',
        ref: null,
    },
    validator: {
        name: 'valicator',
        icon: server,
        position: 'middle',
        ref: null,
    },
    'validator-error': {
        name: 'validator-error',
        icon: servererror,
        position: 'middle',
        ref: null,
    },
    'validator-database': {
        name: 'validator-database',
        icon: database,
        position: 'right',
        ref: null,
    },
    solr: {
        name: 'solr',
        icon: database,
        position: 'right',
        ref: null,
    },
};

/**
 * Circle component renders a div with specific styles and optional children.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.className - Additional class names to apply to the div.
 * @param {React.ReactNode} props.children - The content to be rendered inside the div.
 * @param {React.Ref} ref - The ref to be forwarded to the div element.
 *
 * @returns {JSX.Element} The rendered Circle component.
 */
const Circle = forwardRef(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = 'Circle';

/**
 * Loading component that displays animated beams and circles.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Additional class names for the container.
 * @param {Array} [props.lst=[{ name: 'user' }, { name: 'validator' }, { name: 'validator-database' }]] - List of items to be displayed with their respective names.
 *
 * @returns {JSX.Element} The Loading component.
 */
export default function Loading({
    className,
    lst = [{ name: 'user' }, { name: 'validator' }, { name: 'validator-database' }],
}) {
    const containerRef = useRef(null);
    const right = [];
    const middle = [];
    const left = [];

    lst.map((item) => {
        const div = useRef(null);
        animatedBeamObjects[item.name].ref = div;

        if (animatedBeamObjects[item.name].position === 'right') {
            right.push(animatedBeamObjects[item.name]);
        } else if (animatedBeamObjects[item.name].position === 'middle') {
            middle.push(animatedBeamObjects[item.name]);
        } else {
            left.push(animatedBeamObjects[item.name]);
        }
    });

    return (
        <div className={cn('flex items-center justify-center', className)} ref={containerRef}>
            <div className="relative flex items-center justify-center gap-10 max-w-sm">
                <div className="flex flex-col justify-center gap-2">
                    {right.map((item) => (
                        <Circle key={item.name} ref={item.ref}>
                            <img src={item.icon} alt={item.name} />
                        </Circle>
                    ))}
                </div>
                <div className="flex flex-col justify-center">
                    {middle.map((item) => (
                        <Circle key={item.name} ref={item.ref} className="size-16">
                            <img src={item.icon} alt={item.name} />
                        </Circle>
                    ))}
                </div>
                <div className="flex flex-col justify-center">
                    {left.map((item) => (
                        <Circle key={item.name} ref={item.ref}>
                            <img src={item.icon} alt={item.name} />
                        </Circle>
                    ))}
                </div>

                {lst.map((item) => {
                    return (
                        <AnimatedBeam
                            key={item.name}
                            containerRef={containerRef}
                            fromRef={animatedBeamObjects[item.name].ref}
                            toRef={animatedBeamObjects[lst[1].name].ref}
                            reverse
                            delay={0}
                        />
                    );
                })}
            </div>
        </div>
    );
}
