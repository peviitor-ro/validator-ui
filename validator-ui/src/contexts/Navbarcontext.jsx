import { createContext, useState, useContext, useEffect } from 'react';
import { NAV_LINKS } from '../layouts/AppLayout/components/links';
import { CircleUser, CodeIcon, SearchIcon, Book, BadgeInfo } from 'lucide-react';

const iconsClasses = 'w-5 h-5 lg:w-7 lg:h-7';
const images = {
    Cont: <CircleUser className={iconsClasses} />,
    Scraperi: <CodeIcon className={iconsClasses} />,
    Cautare: <SearchIcon className={iconsClasses} />,
    Despre: <BadgeInfo className={iconsClasses} />,
    Documentatie: <Book className={iconsClasses} />,
};

// context for Navbar
const NavbarContext = createContext();

// Provider-ul pentru context
/**
 * Provides the Navbar context to its children.
 *
 * @function NavbarProvider
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will receive the context.
 * @returns {JSX.Element} The provider component that supplies the Navbar context.
 *
 * @description
 * This component initializes the state of the navigation links using the `NAV_LINKS` array.
 * Each link is augmented with an icon from the `images` object based on the link's name.
 * The state of the links can be reset to the initial state using the `resetLinks` function.
 *
 * @example
 * <NavbarProvider>
 *   <YourComponent />
 * </NavbarProvider>
 */
export function NavbarProvider({ children }) {
    // intial links
    const initialLinks = NAV_LINKS.map(({ name, url, onClick }) => ({
        name,
        url,
        onClick,
        icon: images[name],
    }));

    // state for links
    const [links, setLinks] = useState(initialLinks);

    // reset links to initial state
    const resetLinks = () => setLinks(initialLinks);

    return (
        <NavbarContext.Provider value={{ links, setLinks, resetLinks }}>
            {children}
        </NavbarContext.Provider>
    );
}

export function useNavbar() {
    return useContext(NavbarContext);
}
