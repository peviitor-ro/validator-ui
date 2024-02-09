import { useEffect, useRef, useState } from 'react';

const THRESHOLD = 0;

export default function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState('up');

    const prevScrollY = useRef(0);

    useEffect(() => {
        let blocking = false;
        prevScrollY.current = window.scrollY;

        addEventListener('scroll', handleScroll);

        function handleScroll() {
            if (!blocking) {
                blocking = true;
                requestAnimationFrame(updateScrollDirection);
            }
        }

        function updateScrollDirection() {
            const scrollY = window.scrollY;

            if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
                const newScrollDirection = scrollY > prevScrollY.current ? 'down' : 'up';

                setScrollDirection(newScrollDirection);

                prevScrollY.current = scrollY > 0 ? scrollY : 0;
            }

            blocking = false;
        }

        return () => {
            removeEventListener('scroll', handleScroll);
        };
    }, [scrollDirection]);

    return { scrollDirection, isScrollingDown: scrollDirection == 'down' };
}
