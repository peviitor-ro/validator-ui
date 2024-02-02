import React from 'react';

export default function NavList({ links }) {
    return (
        <>
            {links?.map(({ name, url }) => (
                <a
                    key={name}
                    href={url}
                    className="text-base font-medium hover:text-bg-primary pr-4 pl-4 text-center"
                >
                    {name}
                </a>
            ))}
        </>
    );
}
