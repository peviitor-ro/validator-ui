import { useId } from 'react';
import { cn } from '../../lib/utils';

/**
 * Renders an SVG dot pattern.
 *
 * @param {Object} props - The properties object.
 * @param {number} [props.width=16] - The width of the pattern.
 * @param {number} [props.height=16] - The height of the pattern.
 * @param {number} [props.x=0] - The x-coordinate of the pattern.
 * @param {number} [props.y=0] - The y-coordinate of the pattern.
 * @param {number} [props.cx=1] - The x-coordinate of the circle within the pattern.
 * @param {number} [props.cy=1] - The y-coordinate of the circle within the pattern.
 * @param {number} [props.cr=1] - The radius of the circle within the pattern.
 * @param {string} [props.className] - Additional class names to apply to the SVG element.
 * @param {Object} [props.props] - Additional properties to spread onto the SVG element.
 * @returns {JSX.Element} The rendered SVG dot pattern.
 */
export function DotPattern({
    width = 16,
    height = 16,
    x = 0,
    y = 0,
    cx = 1,
    cy = 1,
    cr = 1,
    className,
    ...props
}) {
    const id = useId();

    return (
        <svg
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80 -z-10',
                className,
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
        </svg>
    );
}

export default DotPattern;
