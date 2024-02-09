import { useEffect, useState } from 'react';

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
