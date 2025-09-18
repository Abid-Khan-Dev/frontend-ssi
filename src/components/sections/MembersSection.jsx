import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionContainer from "../common/SectionContainer";
import SectionHeader from "../common/SectionHeader";
import { members } from "../../data/members";
import Card from "../common/Card";
import Button from "../common/Button";

export default function MembersSection() {
    const navigate = useNavigate();

    // Motion variants for staggered animation
    const containerVariants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.15 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <SectionContainer
            bg="bg-white dark:bg-gray-900 transition-colors duration-500"
            id="members"
        >
            {/* Section Header */}
            <SectionHeader
                title="Meet Our Innovators"
                subtitle="Passionate Educators & Developers"
                description="Our team of talented instructors and developers is dedicated to guiding you on your journey to master future-ready skills and achieve your goals."
            />

            {/* Members Grid with animation */}
            <motion.div
                className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {members.slice(0, 4).map((member, index) => (
                    <motion.div key={index} variants={cardVariants}>
                        <Card
                            image={member.image}
                            title={member.name}
                            description={member.role}
                            variant="member"
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* View All Members Button */}
            <motion.div
                className="flex justify-center mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Button
                    variant="primary"
                    onClick={() => navigate("/members")}
                    className="hover:scale-105 transition-transform duration-300"
                >
                    View All Members
                </Button>
            </motion.div>
        </SectionContainer>
    );
}
