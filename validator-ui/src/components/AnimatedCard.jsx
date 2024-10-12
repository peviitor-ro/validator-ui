import React, { useEffect, useRef, useState } from 'react';
import { useNavbar } from '../contexts/Navbarcontext';
import { BorderBeam } from './ui/border-beam';
import RetroGrid from './ui/retro-grid';
import clsx from 'clsx';
import { GridPattern } from './ui/grid-pattern';
import { cn } from '../lib/utils';

/**
 * Card component that displays a card with interactive features.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the card.
 * @param {Array} props.navLinks - The navigation links to be set when the card is active.
 * @param {string} props.cardId - The unique identifier for the card.
 * @param {Object} props.data - The data associated with the card.
 * @param {Function} props.setEditedData - The function to set the edited data when the card is clicked.
 *
 * @returns {JSX.Element} The rendered Card component.
 */
export function AnimatedCard({ children, navLinks, cardId, data, setEditedData = () => {} }) {
    const { setLinks, resetLinks } = useNavbar();
    const cardRef = useRef(null);
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        if (activeCard === cardId) {
            setLinks(navLinks);
        } else {
            resetLinks();
        }
    }, [activeCard]);

    const handleCardClick = (cardId) => {
        setActiveCard(cardId);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                setActiveCard(null);
            }

            if (activeCard === cardId) {
                setLinks(navLinks);
            } else {
                resetLinks();
            }
        };

        window.addEventListener('click', handleClickOutside);

        // Cleanup event listener
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [activeCard]);

    const cardStyle = clsx(
        'relative card flex flex-col h-[400px] border overflow-hidden cursor-pointer',
        {
            'shadow-lg scale-105 transition-transform duration-300 ease-in-out':
                activeCard === cardId,
        },
    );
    return (
        <div
            className={cardStyle}
            ref={cardRef}
            onClick={() => {
                handleCardClick(cardId);
                setEditedData(data);
            }}
        >
            {activeCard === cardId ? (
                <>
                    <RetroGrid className="top-0 left-0 z-20" />
                    <BorderBeam />
                </>
            ) : (
                <GridPattern
                    squares={[
                        [4, 4],
                        [5, 1],
                        [8, 2],
                        [5, 3],
                        [5, 5],
                        [10, 10],
                        [12, 15],
                        [15, 10],
                        [10, 15],
                        [15, 10],
                        [10, 15],
                        [15, 10],
                    ]}
                    className={cn(
                        '[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
                        'inset-x-0 inset-y-[-20%] h-[100%] skew-y-12',
                    )}
                />
            )}
            <div className={cn('flex flex-col h-full w-full z-10')}>{children}</div>
        </div>
    );
}
