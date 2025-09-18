import React from "react";
import { socialLinks } from "../../data/socialLinks";



export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6 md:px-20 transition-colors duration-500">

            {/* CTA Section */}
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                    Join the Revolution in Learning
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-6">
                    Stay updated with our latest courses, workshops, and tech insights.
                </p>
                <span
                    className="hover:scale-105 transition-transform text-sky-500 duration-300"
                >
                    Follow Us
                </span>
            </div>

            {/* Social & Contact Icons */}
            <div id="social-icons" className="flex flex-wrap justify-center gap-6 mb-12">
                {socialLinks.map(({ icon: Icon, href, label, colorClass }) => (
                    <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="text-gray-600 dark:text-gray-300 transition-colors duration-300 "
                    >
                        <Icon size={22} className={`${colorClass}`} />
                    </a>
                ))}
            </div>

            {/* Footer Note */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-6">
                &copy; {new Date().getFullYear()} Syed Software Institute. All rights reserved.
            </div>
        </footer>
    );
}
