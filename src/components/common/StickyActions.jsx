import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, delay } from "framer-motion";
import { actions } from "../../data/actions";

const StickyActions = React.memo(() => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = useCallback(() => setIsVisible((v) => !v), []);

    // Animation variants
    const containerVariants = useMemo(
        () => ({
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5 } },
        }),
        []
    );

    const itemVariants = useMemo(
        () => ({
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
        }),
        []
    );

    const renderedActions = useMemo(
        () =>
            actions.map((action) => (
                <motion.a
                    key={action.id}
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    aria-label={action.label}
                    title={action.label}
                    variants={itemVariants}
                    className={`
            group relative w-10 h-10 rounded-full flex items-center justify-center
            bg-gray-100 dark:bg-gray-800 shadow-sm
            transition-transform duration-200 transform
            hover:scale-110 hover:bg-gradient-to-tr ${action.gradient}
          `}
                >
                    <action.Icon className="w-5 h-5 text-gray-800 dark:text-gray-100 group-hover:text-white" />

                    {/* Tooltip */}
                    <span
                        className="
              absolute right-full ml-5 top-1/2 -translate-y-1/2
              whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium
              bg-black/70 text-white opacity-0 group-hover:opacity-100
              translate-x-1 group-hover:translate-x-2
              transition-all duration-200
            "
                        aria-hidden="true"
                    >
                        {action.label}
                    </span>
                </motion.a>
            )),
        [itemVariants]
    );

    return (
        <div className="fixed right-6 md:right-[25px] bottom-6 z-50 flex flex-col items-center gap-3">
            {/* Toggle Button */}
            <button
                onClick={toggleVisibility}
                className="w-10 h-10 rounded-full flex items-center justify-center
                   bg-sky-500 hover:bg-sky-600 text-white shadow-md text-lg
                   transition-all duration-200"
                aria-label={isVisible ? "Hide Actions" : "Show Actions"}
            >
                {isVisible ? "×" : "☰"}
            </button>

            {/* Sticky Actions */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className="flex flex-col items-center gap-3 mt-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: 30, transition: { duration: 0.2 } }}
                    >
                        {renderedActions}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

export default StickyActions;
