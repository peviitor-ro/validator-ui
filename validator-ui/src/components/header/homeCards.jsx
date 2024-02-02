import React from 'react';

function HomeCards({ data }) {
    const { id, name, image, description, linkSite } = data;

    return (
        <div
            key={id}
            className="flex flex-col justify-between w-[300px] h-[400px] bg-bg-container rounded-lg p-4 hover:shadow-card-shadow "
        >
            <img src={image} className="m-auto" alt="Company logo" />

            <h1 className="text-center text-lg font-semibold mb-auto uppercase">{name}</h1>

            <div className="flex flex-col gap-2">
                <p className="text-balance mb-5 text-sm">{description}</p>
                <a
                    href={linkSite}
                    className=" border-2 text-center rounded-lg py-2 bg-bg-primary text-white font-medium"
                >
                    Vizualizeaza Joburi (15)
                </a>
                <a
                    href={linkSite}
                    className="text-center rounded-lg py-2 text-bg-primary border-[1px] border-bg-primary font-medium"
                >
                    Vizualizeaza WebSite
                </a>
            </div>
        </div>
    );
}

export default HomeCards;
