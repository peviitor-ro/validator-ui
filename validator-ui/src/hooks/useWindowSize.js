import { useEffect, useState } from 'react';

/**
 * Custom hook that provides the current window size.
 *
 * @returns {Object} An object containing the width and height of the window.
 * @returns {number} width - The current width of the window.
 * @returns {number} height - The current height of the window.
 */
export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    function handleSize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    useEffect(() => {
        addEventListener('resize', handleSize);

        return () => {
            removeEventListener('resize', handleSize);
        };
    }, []);

    return { width: windowSize.width, height: windowSize.height };
}
