import React, { useMemo, useCallback } from "react";
import SectionContainer from "../components/common/SectionContainer";
import SectionHeader from "../components/common/SectionHeader";
import { motion } from "framer-motion";
import EventCard from "../components/common/EventCard";
import { events } from "../data/events";

export default function EventsPage() {
    const groupedEvents = useMemo(() => {
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        let todayEvents = [];
        let lastWeekEvents = [];
        let thisMonthEvents = [];
        let lastMonthEvents = [];
        let olderEvents = [];

        events.forEach((event) => {
            const eventDate = new Date(event.date);
            const eventStr = eventDate.toISOString().split("T")[0];

            if (eventStr === todayStr) todayEvents.push(event);
            else if (eventDate >= sevenDaysAgo && eventDate < today) lastWeekEvents.push(event);
            else if (
                eventDate.getMonth() === today.getMonth() &&
                eventDate.getFullYear() === today.getFullYear()
            )
                thisMonthEvents.push(event);
            else if (
                eventDate.getMonth() === today.getMonth() - 1 &&
                eventDate.getFullYear() === today.getFullYear()
            )
                lastMonthEvents.push(event);
            else olderEvents.push(event);
        });

        return { todayEvents, lastWeekEvents, thisMonthEvents, lastMonthEvents, olderEvents };
    }, [events]);

    const renderSection = useCallback((title, list) => {
        if (!list.length) return null;
        return (
            <>
                <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">{title}</h2>
                <motion.div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {list.map((event, idx) => (
                        <motion.div
                            key={event.id + idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
                        >
                            <EventCard event={event} variant="default" /> {/* make EventCard handle dark mode */}
                        </motion.div>
                    ))}
                </motion.div>
            </>
        );
    }, []);


    if (!events.length) return null;

    return (
        <SectionContainer>
            <SectionHeader
                title="All Institute Events & News"
                subtitle="Stay Updated with Everything"
                description="Click on any event to view more details."
            />

            {renderSection("Today's Events", groupedEvents.todayEvents)}
            {renderSection("Last Week", groupedEvents.lastWeekEvents)}
            {renderSection("This Month", groupedEvents.thisMonthEvents)}
            {renderSection("Last Month", groupedEvents.lastMonthEvents)}
            {renderSection("Older Events", groupedEvents.olderEvents)}
        </SectionContainer>
    );
}

