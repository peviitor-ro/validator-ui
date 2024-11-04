import { useId } from 'react';
import { cn } from '../../lib/utils';

/**
 * GridPattern component renders an SVG grid pattern with optional squares.
 *
 * @param {Object} props - The properties object.
 * @param {number} [props.width=40] - The width of the grid pattern.
 * @param {number} [props.height=40] - The height of the grid pattern.
 * @param {number} [props.x=-1] - The x-coordinate offset for the pattern.
 * @param {number} [props.y=-1] - The y-coordinate offset for the pattern.
 * @param {string} [props.strokeDasharray='0'] - The stroke dash array for the grid lines.
 * @param {Array} [props.squares] - An array of coordinates for additional squares to render.
 * @param {string} [props.className] - Additional class names to apply to the SVG element.
 * @param {Object} props - Additional properties to spread on the SVG element.
 * @returns {JSX.Element} The rendered SVG grid pattern.
 */
export function GridPattern({
    width = 40,
    height = 40,
    x = -1,
    y = -1,
    strokeDasharray = '0',
    squares,
    className,
    ...props
}) {
    const id = useId();

    return (
        <svg
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30',
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
                    x={x}
                    y={y}
                >
                    <path
                        d={`M.5 ${height}V.5H${width}`}
                        fill="none"
                        strokeDasharray={strokeDasharray}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y]) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}`}
                            width={width - 1}
                            height={height - 1}
                            x={x * width + 1}
                            y={y * height + 1}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}

export default GridPattern;
