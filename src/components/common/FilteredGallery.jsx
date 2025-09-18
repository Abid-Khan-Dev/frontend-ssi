import React, { useState } from "react";
import { motion } from "framer-motion";
import ImageModal from "./ImageModal";

export default function FilteredGallery({ items }) {
    const [selected, setSelected] = useState(null);

    const containerVariants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.15 } },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <>
            {/* Gallery Grid */}
            <motion.div
                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {items.map((item, idx) => (
                    <motion.div key={idx} variants={cardVariants}>
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => setSelected(item)}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Modal */}
            <ImageModal item={selected} onClose={() => setSelected(null)} />
        </>
    );
}
