import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageModal({ item, onClose, event = false }) {
    const src = item?.image || item;

    return (
        <AnimatePresence>
            {src && (
                <motion.div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // clicking outside closes modal
                >
                    <motion.div
                        className="relative w-full max-w-4xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <img
                            src={src}
                            alt={item?.title || "Preview"}
                            className="w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                        />

                        {/* Responsive Close Button */}
                        <button
                            onClick={onClose}
                            className={`absolute top-2 right-2  w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 hover:bg-red-500 text-black dark:text-white rounded-full shadow-lg transition-all text-2xl md:text-3xl z-50 ${event && 'md:right-[50px] md:top-[5px]'} cursor-pointer`}
                        >
                            &times;
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
