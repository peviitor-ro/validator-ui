export default function NavList({ links }) {
    return (
        <nav className="lg:block hidden">
            {links?.map(({ name, url }) => (
                <a
                    key={name}
                    href={url}
                    className="text-base font-medium hover:text-bg-primary pr-4 pl-4 text-center"
                >
                    {name}
                </a>
            ))}
        </nav>
    );
}
