// src/components/sections/EventsSectionHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SectionContainer from "../common/SectionContainer";
import SectionHeader from "../common/SectionHeader";
import { motion } from "framer-motion";
import Card from "../common/Card";
import Button from "../common/Button";
import { events } from "../../data/events";
import { getYouTubeId } from "../../utils/getYouTubeId";

const ITEMS_TO_SHOW = 3;
const MotionButton = motion(Button);

export default function EventsSectionHome() {
  const navigate = useNavigate();
  const displayedEvents = events.slice(0, ITEMS_TO_SHOW);

  return (
    <SectionContainer bg="" id="events">
      <SectionHeader
        title="Upcoming Events"
        subtitle="Stay Updated with Our Activities"
        description="Check out the latest happenings at SSI."
      />

      <motion.div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {displayedEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
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

      {events.length > ITEMS_TO_SHOW && (
        <div className="flex justify-center mt-6">
          <MotionButton
            onClick={() => navigate("/events")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2"
            variant="primary"
          >
            View All Events
          </MotionButton>
        </div>
      )}
    </SectionContainer>
  );
}
