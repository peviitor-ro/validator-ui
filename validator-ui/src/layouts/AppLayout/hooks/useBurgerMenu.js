'use client';

import { useEffect, useState } from 'react';

export const useHamburgerMenu = (width) => {
    const [isOpen, setIsOpen] = useState(false);
    // const { width } = useWindowSize();

    function handleToggle(state) {
        if (state) {
            addStyleToElements();
        } else {
            removeStyleFromElements();
        }

        setIsOpen(state);
    }

    useEffect(() => {
        if (width > 760 && isOpen) {
            setIsOpen(false);
            removeStyleFromElements();
        }

        return () => {
            removeStyleFromElements();
        };
    }, [width]);

    return { isOpen, handleToggle };
};

function addStyleToElements() {
    document.body.classList.add('overflow-hidden');
}

function removeStyleFromElements() {
    document.body.classList.remove('overflow-hidden');
}
