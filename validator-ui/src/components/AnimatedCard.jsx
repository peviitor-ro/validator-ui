import React, { useEffect, useRef, useState } from 'react';
import { useNavbar } from '../contexts/Navbarcontext';
import { BorderBeam } from './ui/border-beam';
import RetroGrid from './ui/retro-grid';
import clsx from 'clsx';

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
            {activeCard === cardId && (
                <>
                    <RetroGrid className="top-0 left-0" />
                    <BorderBeam />
                </>
            )}
            {children}
        </div>
    );
}
