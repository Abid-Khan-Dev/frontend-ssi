// src/pages/CourseDetailsPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Courses } from "../data/courses";
import Button from "../components/common/Button";
import SectionContainer from "../components/common/SectionContainer";
import { motion } from "framer-motion";

export default function CourseDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const course = Courses.find((c) => c.id === id);

    if (!course) {
        return (
            <SectionContainer>
                <div className="text-center py-20 text-gray-700 dark:text-gray-300">
                    Course not found.
                </div>
            </SectionContainer>
        );
    }

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <SectionContainer>
            <motion.div
                className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            >
                {/* Header */}
                <motion.h1
                    className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    variants={fadeUp}
                >
                    {course.title}
                </motion.h1>

                {/* Image with 16:9 aspect ratio */}
                <motion.div
                    className="relative aspect-[16/9] w-full rounded-xl shadow-md mb-4 overflow-hidden"
                    variants={fadeUp}
                >
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover object-center rounded-xl"
                    />
                </motion.div>

                {/* Description */}
                <motion.p
                    className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base"
                    variants={fadeUp}
                >
                    {course.desc}
                </motion.p>

                {/* Details */}
                <motion.div
                    className="flex flex-wrap gap-4 mb-6"
                    variants={fadeUp}
                >
                    <div className="flex-1 min-w-[120px] p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center shadow-sm">
                        <h4 className="text-gray-900 dark:text-white font-semibold text-sm">
                            Price
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {course.price}
                        </p>
                    </div>
                    <div className="flex-1 min-w-[120px] p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center shadow-sm">
                        <h4 className="text-gray-900 dark:text-white font-semibold text-sm">
                            Duration
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {course.duration}
                        </p>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div className="flex gap-4" variants={fadeUp}>
                    <Button
                        variant="primary"
                        onClick={() =>
                            navigate("/enroll", { state: { selectedCourse: course.id } })
                        }
                        className="hover:scale-105 transition-transform duration-200"
                    >
                        Enroll Today
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigate(-1)}
                        className="hover:scale-105 transition-transform duration-200"
                    >
                        Back
                    </Button>
                </motion.div>
            </motion.div>
        </SectionContainer>
    );
}
