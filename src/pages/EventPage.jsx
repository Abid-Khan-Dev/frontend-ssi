// src/pages/EventsPage.jsx
import React from "react";
import SectionContainer from "../components/common/SectionContainer";
import SectionHeader from "../components/common/SectionHeader";
import { motion } from "framer-motion";
import Card from "../components/common/Card";
import { useNavigate } from "react-router-dom";
import { events } from "../data/events";
import { getYouTubeId } from "../utils/getYouTubeId";

export default function EventsPage() {
    const navigate = useNavigate();

    return (
        <SectionContainer bg="">
            <SectionHeader
                title="All Institute Events & News"
                subtitle="Stay Updated with Everything"
                description="Click on any event to view more details."
            />

            <motion.div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {events.map((event, idx) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
                    >
                        <Card
                            image={
                                event.image
                                    ? event.image // prioritize image
                                    : event.images && event.images.length > 0
                                        ? event.images[0]
                                        : event.video
                                            ? event.video.includes("youtube")
                                                ? (() => {
                                                    const videoId = getYouTubeId(event.video);
                                                    return videoId
                                                        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                                                        : "/assets/video-placeholder.webp";
                                                })()
                                                : "/assets/video-placeholder.webp" // for mp4/webm
                                            : "/assets/video-placeholder.webp" // fallback
                            }
                            title={event.title}
                            description={
                                event.description.length > 100
                                    ? event.description.slice(0, 100) + "..."
                                    : event.description
                            }
                            buttonText="View Details"
                            onClick={() => navigate(`/events/${event.id}`)}
                            variant="default"
                        />

                    </motion.div>
                ))}
            </motion.div>
        </SectionContainer>
    );
}
