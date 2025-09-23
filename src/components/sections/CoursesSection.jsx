import React from "react";
import { useNavigate } from "react-router-dom";
import { Courses } from "../../data/courses";
import { motion } from "framer-motion";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import SectionContainer from "../common/SectionContainer";
import Button from "../common/Button";

export default function CoursesSection() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.2 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <SectionContainer
            id="courses"
        >
            <SectionHeader
                title="Explore Our Trending Courses"
                subtitle="Future-Ready Skills for Tomorrow’s Innovators"
                description="From Web and Mobile apps to Desktop solutions and MS Office mastery, our courses are designed to prepare you for the real-world tech industry."
            />

            {/* Display top 3 courses */}
            <motion.div
                className="grid sm:grid-cols-2 md:grid-cols-3 gap-8  mt-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {Courses.slice(0, 3).map((course) => (
                    <motion.div key={course.id} variants={cardVariants}>
                        <Card
                            image={course.image}
                            title={course.title}
                            description={course.desc}
                            buttonText="View Details"
                            variant="course"
                            onClick={() =>
                                navigate(`/course/${course.id}`, {
                                    state: { selectedCourse: course.id },
                                })
                            }
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                className="flex justify-center mt-12 gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true }}
            >
                <Button
                    variant="primary"
                    className="hover:scale-105 transition-transform duration-300 shadow-md"
                    onClick={() => navigate("/courses")}
                >
                    View All Courses
                </Button>
                <Button
                    variant="secondary"
                    className="hover:scale-105 transition-transform duration-300 shadow-md"
                    onClick={() => navigate("/enroll")}
                >
                    Enroll Today
                </Button>
            </motion.div>
        </SectionContainer>
    );
}
