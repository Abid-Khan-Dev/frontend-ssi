import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationLinks({ to, label, onClick }) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) => `relative group text-gray-900 dark:text-gray-200 font-medium hover:text-sky-500 transition-colors duration-300 text-sm ${isActive ? 'text-sky-500 dark:text-sky-400' : ''}`}
        >
            {/* Text */}
            {label}

            {/* Underline */}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-sky-500 dark:bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
        </NavLink >
    );
}

export default NavigationLinks;
