// src/components/common/Card.jsx
import React from "react";
import Button from "./Button";

export default function Card({
    image,
    title,
    description,
    buttonText,
    onClick,
    variant,
}) {
    return (
        <div
            className={`outline-2 outline-gray-200 dark:outline-gray-700
        relative flex flex-col justify-center items-center p-6 rounded-3xl
        shadow-sm hover:shadow-xl dark:shadow-gray-800 transform transition-shadow duration-300
        overflow-hidden max-w-sm mx-auto h-[380px] min-h-[380px]

        ${variant === "member"
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-100 dark:bg-gray-800"
                }
      `}
        >
            {/* Image */}
            {image && (
                <div
                    className={`
            relative overflow-hidden
            ${variant === "member"
                            ? "aspect-square w-32 rounded-full border-4 border-gray-200 dark:border-gray-700 mb-4"
                            : "aspect-[16/9] w-full rounded-2xl border border-gray-300 dark:border-gray-700 mb-4"
                        }
          `}
                >
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                </div>
            )}

            {/* Title */}
            {title && (
                <h4
                    className={`
            ${variant === "member"
                            ? "text-xl md:text-2xl font-bold"
                            : "text-lg font-semibold"
                        } 
            text-center 
            text-gray-900 dark:text-gray-100
            mb-2
          `}
                >
                    {title}
                </h4>
            )}

            {/* Description */}
            {description && (
                <p
                    className={`
            ${variant === "member"
                            ? "text-gray-700 dark:text-gray-300 text-sm md:text-base"
                            : "text-gray-600 dark:text-gray-400 text-sm"
                        } 
            text-center mb-4 line-clamp-3 pb-1
          `}
                >
                    {description}
                </p>
            )}

            {/* Button */}
            {buttonText && <Button onClick={onClick}>{buttonText}</Button>}

            {/* Optional floating accents for members */}
            {variant === "member" && (
                <>
                    <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-tr from-blue-500 to-cyan-600 rounded-full opacity-20 blur-2xl pointer-events-none animate-pulse"></div>
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full opacity-20 blur-xl pointer-events-none animate-[spin_15s_linear_infinite]"></div>
                </>
            )}
        </div>
    );
}
