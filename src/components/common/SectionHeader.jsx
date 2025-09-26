import React from "react";

export default function SectionHeader({ title, subtitle, description }) {
    return (
        <div className={`mb-5 text-center`}>
            {title && (
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-white">
                    {title}
                </h2>
            )}
            {subtitle && (
                <h3 className="text-xl md:text-2xl font-semibold mb-6 leading-snug text-gray-700 dark:text-gray-300">
                    {subtitle}
                </h3>
            )}
            {description && (
                <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            )}
        </div>
    );
}
