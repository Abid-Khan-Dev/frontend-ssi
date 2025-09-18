import React from "react";
import { Courses } from "../data/courses";
import { motion } from "framer-motion";
import Card from "../components/common/Card";
import SectionHeader from "../components/common/SectionHeader";
import SectionContainer from "../components/common/SectionContainer";
import { useNavigate } from "react-router-dom";

export default function AllCoursesPage() {
    const navigate = useNavigate();

    // Animations
    const containerVariants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.15 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <SectionContainer
            bg="bg-white dark:bg-gray-900 transition-colors duration-500"
            id="all-courses"
        >
            {/* Page Header */}
            <SectionHeader
                title="All Courses"
                subtitle="Master Skills for the Future"
                description="Explore our complete catalog — from web & mobile dev to 3D and office tools. Each course is built to level up your skills."
            />

            {/* Courses Grid */}
            <motion.div
                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {Courses.map((course, idx) => (
                    <motion.div key={idx} variants={cardVariants}>
                        <Card
                            image={course.image}
                            title={course.title}
                            description={course.desc}
                            buttonText="View Details"
                            variant="course"
                            onClick={() => navigate(`/course/${course.id}`)}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </SectionContainer>
    );
}
