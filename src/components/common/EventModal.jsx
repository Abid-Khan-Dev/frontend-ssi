import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getYouTubeId } from "../../utils/getYouTubeId";

const EventModal = React.memo(({ items = [], initialIndex = 0, onClose }) => {
    const [current, setCurrent] = useState(initialIndex);
    const [loading, setLoading] = useState(true);

    const mediaClass =
        "w-full max-h-[85vh] rounded-2xl shadow-lg transition-opacity duration-500";

    // Close modal on ESC
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Reset loading and preload images
    useEffect(() => {
        setLoading(true);
        items.forEach((item) => {
            if (item.match(/\.(jpg|jpeg|png|gif)$/)) {
                const img = new Image();
                img.src = item;
            }
        });
    }, [current, items]);

    const prevSlide = useCallback(
        () => setCurrent((c) => (c - 1 + items.length) % items.length),
        [items.length]
    );

    const nextSlide = useCallback(
        () => setCurrent((c) => (c + 1) % items.length),
        [items.length]
    );

    const renderMedia = useMemo(() => {
        const item = items[current];
        if (!item) return null;

        const youtubeId = getYouTubeId(item);

        if (youtubeId || item.includes("youtube")) {
            const src = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : item;
            return (
                <iframe
                    className={`${mediaClass} ${loading ? "opacity-0" : "opacity-100"} h-96 md:h-[500px] lg:h-[600px]`}
                    src={src}
                    title="YouTube video"
                    allowFullScreen
                    onLoad={() => setLoading(false)}
                />
            );
        }

        if (item.match(/\.(mp4|webm)$/)) {
            return (
                <video
                    src={item}
                    controls
                    autoPlay
                    className={`${mediaClass} ${loading ? "opacity-0" : "opacity-100"}`}
                    onLoadedData={() => setLoading(false)}
                />
            );
        }

        return (
            <img
                src={item}
                alt="media"
                className={`${mediaClass} object-contain ${loading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setLoading(false)}
            />
        );
    }, [current, items, loading, mediaClass]);

    if (!items.length) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-gray-100/90 dark:bg-gray-900/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="relative w-full max-w-5xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-4 flex justify-center items-center"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                        </div>
                    )}

                    {renderMedia}

                    {items.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-full shadow transition"
                            >
                                <ChevronLeft className="w-6 h-6 hover:cursor-pointer" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-full shadow transition cursor-pointer"
                            >
                                <ChevronRight className="w-6 h-6 hover:cursor-pointer" />
                            </button>
                        </>
                    )}

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-red-500 hover:text-white rounded-full shadow-lg transition cursor-pointer"
                    >
                        <X className="w-6 h-6 hover:text-red-600" />
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});

export default EventModal;
