// src/components/sections/EventsSectionHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SectionContainer from "../common/SectionContainer";
import SectionHeader from "../common/SectionHeader";
import { motion } from "framer-motion";
import Button from "../common/Button";
import { events } from "../../data/events";
import EventCard from "../common/EventCard";

const ITEMS_TO_SHOW = 3;
const MotionButton = motion(Button);

export default function EventsSectionHome() {
  const navigate = useNavigate();
  const displayedEvents = events.slice(0, ITEMS_TO_SHOW);

  if (!displayedEvents.length) return null; // nothing to show

  return (
    <SectionContainer id="events">
      <SectionHeader
        title="Upcoming Events"
        subtitle="Stay Updated with Our Activities"
        description="Check out the latest happenings at SSI."
      />

      <motion.div
        className="flex flex-wrap justify-center gap-6 mt-8"
      >
        {displayedEvents.map((event, idx) => (
          <motion.div
            key={event.id + idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
          // className="w-full sm:w-[48%] md:w-[31%] lg:w-[30%] xl:w-[23%]"
          >
            <EventCard event={event} variant="default" />
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
          >
            View All Events
          </MotionButton>
        </div>
      )}
    </SectionContainer>
  );
}
