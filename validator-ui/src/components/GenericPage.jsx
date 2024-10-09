import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/Button';
import { Container } from './Container';
import RetroGrid from './ui/retro-grid';

/**
 * Symbol component for the GenericPage.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.icon - The icon to be displayed.
 * @returns {JSX.Element} The rendered Symbol component.
 */

/**
 * Title component for the GenericPage.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The title text to be displayed.
 * @param {string} [props.className] - Additional class names to apply to the title.
 * @returns {JSX.Element} The rendered Title component.
 */

/**
 * Description component for the GenericPage.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The description text to be displayed.
 * @returns {JSX.Element} The rendered Description component.
 */

/**
 * Link component for the GenericPage.
 *
 * @param {Object} props - The component props.
 * @param {string} props.to - The path to link to.
 * @param {React.ReactNode} [props.icon] - The icon to be displayed. Defaults to ArrowLeftIcon.
 * @param {string} props.text - The link text to be displayed.
 * @returns {JSX.Element} The rendered Link component.
 */

/**
 * ExternalLink component for the GenericPage.
 *
 * @param {Object} props - The component props.
 * @param {string} props.href - The URL to link to.
 * @param {string} props.target - The target attribute specifies where to open the linked document.
 * @param {React.ReactNode} [props.icon] - The icon to be displayed. Defaults to ArrowTopRightOnSquareIcon.
 * @param {string} props.text - The link text to be displayed.
 * @returns {JSX.Element} The rendered ExternalLink component.
 */

/**
 * Action component for the GenericPage.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * @param {React.ReactNode} [props.icon] - The icon to be displayed. Defaults to ArrowTopRightOnSquareIcon.
 * @param {string} props.text - The button text to be displayed.
 * @returns {JSX.Element} The rendered Action component.
 */
export function GenericPage({ children, className }) {
    return (
        <Container
            className={clsx('flex items-center justify-center flex-col px-6', {
                [className]: className,
            })}
        >
            <div className="flex flex-col items-center justify-center bg-card rounded-md p-6 drop-shadow-lg w-full max-w-md z-10 border">
                <RetroGrid className="top-0 left-0" />
                {children}
            </div>
        </Container>
    );
}

GenericPage.Symbol = ({ icon }) => {
    return <span className="text-subtitle w-28">{icon}</span>;
};

GenericPage.Title = ({ text, className }) => {
    return (
        <p
            className={clsx('text-4xl font-semibold text-heading my-4 text-center', {
                [className]: className,
            })}
        >
            {text}
        </p>
    );
};

GenericPage.Description = ({ text }) => {
    return <p className="text-xl max-w-xl text-center">{text}</p>;
};

GenericPage.Link = ({ to, icon = <ArrowLeftIcon />, text }) => {
    return (
        <NavLink className="btn mt-10 flex items-center" to={to}>
            <span className="w-4 mr-2">{icon}</span>
            {text}
        </NavLink>
    );
};

GenericPage.ExternalLink = ({ href, target, icon = <ArrowTopRightOnSquareIcon />, text }) => {
    return (
        <a className="btn mt-10 flex items-center cursor-pointer" href={href} target={target}>
            <span className="w-4 mr-2">{icon}</span>
            {text}
        </a>
    );
};

GenericPage.Action = ({ onClick, icon = <ArrowTopRightOnSquareIcon />, text }) => {
    return <Button type="button" text={text} onClick={onClick} icon={icon} className="mt-10" />;
};
