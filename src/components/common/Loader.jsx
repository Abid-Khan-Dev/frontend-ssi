import React from "react";

export default function Loader() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-600"></div>
        </div>
    );
}
