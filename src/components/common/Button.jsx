import React from "react";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium px-4 py-2.5 rounded-lg text-sm transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900";

  // Only color, background, shadow for variants
  const primaryStyles = `
    bg-gradient-to-r from-blue-600 to-cyan-500
    text-white shadow-sm
    hover:shadow-md hover:scale-105
    active:scale-95 active:shadow-sm
    focus:ring-blue-400
    dark:from-blue-500 dark:to-cyan-400
  `;

  const secondaryStyles = `
    border border-gray-300 text-gray-700
    hover:bg-gray-100 hover:text-gray-900
    active:bg-gray-200
    dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700
    shadow-sm hover:shadow-md
  `;

  const styles = variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button onClick={onClick} className={`${baseStyles} ${styles} ${className}`}>
      {children}
    </button>
  );
}
