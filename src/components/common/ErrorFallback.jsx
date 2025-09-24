import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Button from "./Button";

export default function ErrorFallback({ error }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-3">
            <div className="relative flex flex-col items-center justify-center 
                      p-6 w-80 bg-gradient-to-br from-sky-50 to-white 
                      dark:from-[#0a0f1c] dark:to-[#111827] 
                      rounded-2xl shadow-xl text-center">

                {/* Icon */}
                <FaExclamationTriangle className="text-red-500 text-4xl mb-2 animate-bounce" />

                {/* Title */}
                <h2 className="text-xl font-bold text-red-600 mb-1">
                    Something went wrong
                </h2>

                {/* Error Message */}
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {error?.message || "An unexpected error occurred."}
                </p>

                {/* Retry Buttons */}
                <div className="flex gap-3">
                    <Button
                        onClick={() => window.location.reload()}
                        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 
                         hover:from-cyan-500 hover:to-blue-500 text-white font-semibold 
                         rounded-full shadow-md transition-transform transform hover:scale-105"
                    >
                        Reload Page
                    </Button>

                    <Button
                        onClick={() => (window.location.href = "/")}
                        className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-500 
                         hover:from-emerald-500 hover:to-green-500 text-white font-semibold 
                         rounded-full shadow-md transition-transform transform hover:scale-105"
                    >
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
