import React, { useState } from "react";
import SectionContainer from "../common/SectionContainer";
import SectionHeader from "../common/SectionHeader";
import { motion } from "framer-motion";
import ImageModal from "../common/ImageModal";
import { achievements } from "../../data/achievements";

const ITEMS_PER_PAGE = 8;

export default function AchievementsSection() {
    const [selected, setSelected] = useState(null);
    const [visibleCounts, setVisibleCounts] = useState({});

    const categories = [...new Set(achievements.map(a => a.category))];

    const handleLoadMore = (cat) => {
        setVisibleCounts(prev => ({
            ...prev,
            [cat]: (prev[cat] || ITEMS_PER_PAGE) + ITEMS_PER_PAGE
        }));
    };

    return (
        <SectionContainer id="projects">
            <SectionHeader
                title="Our Achievements"
                subtitle="Projects That Showcase Our Expertise"
                description="Click on any project to view it in full screen."
            />

            {categories.map(cat => {
                const items = achievements.filter(a => a.category === cat);
                const visibleCount = visibleCounts[cat] || ITEMS_PER_PAGE;
                const displayedItems = items.slice(0, visibleCount);

                return (
                    <div key={cat} className="mt-12">
                        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{cat}</h3>

                        <motion.div className="flex flex-wrap justify-center gap-4">
                            {displayedItems.map((item, idx) => (
                                <motion.div
                                    key={`${cat}-${idx}`}
                                    className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] xl:w-[20%] cursor-pointer relative rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
                                    whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                                    onClick={() => setSelected(item)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                                >
                                    {/* Image with fixed aspect ratio */}
                                    <div className="w-full aspect-[16/9]">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm p-2 text-center">
                                        {item.title}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {visibleCount < items.length && (
                            <div className="flex justify-center mt-6">
                                <motion.button
                                    onClick={() => handleLoadMore(cat)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
                                >
                                    Load More
                                </motion.button>
                            </div>
                        )}
                    </div>
                );
            })}

            {selected && <ImageModal item={selected} onClose={() => setSelected(null)} />}
        </SectionContainer>
    );
}
