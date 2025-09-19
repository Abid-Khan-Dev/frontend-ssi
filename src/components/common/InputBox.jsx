import React from 'react'

function InputBox({ label, type = 'text', placeholder, name, value, onChange, required = false }) {
    return (
        <>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700
                                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                    focus:ring-2 focus:ring-sky-400 outline-none"
            />
        </>
    )
}

export default InputBox
