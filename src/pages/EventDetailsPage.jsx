import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionContainer from "../components/common/SectionContainer";
import Button from "../components/common/Button";
import { events } from "../data/events";
import ImageModal from "../components/common/ImageModal";

export default function EventDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    // Find the event by ID
    const event = events.find((e) => e.id === parseInt(id));

    if (!event) {
        return (
            <SectionContainer>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Event Not Found
                </h2>
                <Button onClick={() => navigate("/events")}>Back to Events</Button>
            </SectionContainer>
        );
    }

    return (
        <SectionContainer bg="">
            <div className="max-w-4xl mx-auto py-16 px-6">
                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {event.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    {event.date}
                </p>

                {/* Multiple Images Support (Gallery Layout) */}
                {event.images && event.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {event.images.map((img, idx) => (
                            <img
                                onClick={() => setSelected(img)}
                                key={idx}
                                src={img}
                                alt={`${event.title} - ${idx + 1}`}
                                className="w-full aspect-video object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                            />
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                    {/* Single Image (if no multiple images) */}
                    {!event.images && event.image && (

                        <img
                            onClick={() => setSelected(event.image)}
                            src={event.image}
                            alt={event.title}
                            className="w-full  aspect-video object-cover rounded-xl mb-6 shadow-lg"
                        />
                    )}

                    {/* Video Handling */}
                    {event.video && (
                        <div className="w-full mb-6">
                            {event.video.endsWith(".mp4") || event.video.endsWith(".webm") ? (
                                <video
                                    src={event.video}
                                    controls
                                    className="w-full aspect-video rounded-xl shadow-lg"
                                />
                            ) : (
                                <iframe
                                    src={event.video}
                                    title={event.title}
                                    className="w-full aspect-video rounded-xl shadow-lg"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                    )}
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {event.description}
                </p>

                {/* Back Button */}
                <div className="mt-6">
                    <Button onClick={() => navigate("/events")}>Back to Events</Button>
                </div>
            </div>
            {selected && <ImageModal item={selected} onClose={() => setSelected(null)} event />}
        </SectionContainer>
    );
}
