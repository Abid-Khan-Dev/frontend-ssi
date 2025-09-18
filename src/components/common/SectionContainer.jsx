import React from "react";

export default function SectionContainer({ children, bg = "bg-white", id }) {
    return (
        <section
            id={id}
            className={`py-20 px-6 md:px-20 ${bg} dark:bg-gray-900 transition-colors duration-300 ${id == 'hero' && 'min-h-screen'} `}
        >
            {children}
            <hr className="my-16 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10" />
        </section>
    );
}
