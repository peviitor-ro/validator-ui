export function Cards({ data, component: Component }) {
    return (
        <>
            {data?.map((element, index) => (
                <Component key={index} data={element} />
            ))}
        </>
    );
}
