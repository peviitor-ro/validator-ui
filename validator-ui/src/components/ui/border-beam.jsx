import { cn } from '../../lib/utils';

/**
 * BorderBeam component renders a styled div with animated border effects.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Additional class names for the component.
 * @param {number} [props.size=200] - The size of the animated border.
 * @param {number} [props.duration=15] - The duration of the animation in seconds.
 * @param {number} [props.anchor=90] - The anchor point for the animation.
 * @param {number} [props.borderWidth=1.5] - The width of the border.
 * @param {string} [props.colorFrom='#ffaa40'] - The starting color of the gradient.
 * @param {string} [props.colorTo='#9c40ff'] - The ending color of the gradient.
 * @param {number} [props.delay=0] - The delay before the animation starts, in seconds.
 * @returns {JSX.Element} The rendered BorderBeam component.
 */
export const BorderBeam = ({
    className,
    size = 200,
    duration = 15,
    anchor = 90,
    borderWidth = 1.5,
    colorFrom = '#ffaa40',
    colorTo = '#9c40ff',
    delay = 0,
}) => {
    return (
        <div
            style={{
                '--size': size,
                '--duration': duration,
                '--anchor': anchor,
                '--border-width': borderWidth,
                '--color-from': colorFrom,
                '--color-to': colorTo,
                '--delay': `-${delay}s`,
            }}
            className={cn(
                'pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]',

                // mask styles
                '![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',

                // pseudo styles
                'after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]',
                className,
            )}
        />
    );
};
