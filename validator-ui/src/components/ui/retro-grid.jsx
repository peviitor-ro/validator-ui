import { cn } from '../../lib/utils';

/**
 * RetroGrid component renders a grid with a retro style background.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Additional class names to apply to the grid container.
 * @param {number} [props.angle=65] - The angle of the grid rotation in degrees.
 *
 * @returns {JSX.Element} The rendered RetroGrid component.
 */
export default function RetroGrid({ className, angle = 65 }) {
    return (
        <div
            className={cn(
                'pointer-events-none absolute size-full overflow-hidden opacity-50 [perspective:200px]',
                className,
            )}
            style={{ '--grid-angle': `${angle}deg` }}
        >
            {/* Grid */}
            <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
                <div
                    className={cn(
                        'animate-grid',

                        '[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]',

                        // Light Styles
                        '[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]',

                        // Dark styles
                        'dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]',
                    )}
                />
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
        </div>
    );
}
