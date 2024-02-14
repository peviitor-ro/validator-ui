import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/Button';
import { Container } from './Container';

export function GenericPage({ children, className }) {
    return (
        <Container
            className={clsx('flex items-center justify-center flex-col px-6', {
                [className]: className,
            })}
        >
            {children}
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
