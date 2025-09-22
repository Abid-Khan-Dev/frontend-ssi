import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Courses } from "../data/courses";
import Button from "../components/common/Button";
import SectionContainer from "../components/common/SectionContainer";
import { motion } from "framer-motion";

export default function CourseDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Memoize course lookup
    const course = useMemo(() => Courses.find((c) => c.id === id), [id]);

    if (!course) {
        return (
            <SectionContainer>
                <div className="text-center py-20 text-gray-700 dark:text-gray-300">
                    Course not found.
                </div>
            </SectionContainer>
        );
    }

    // Motion variants
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
    };

    // Details cards (Price, Duration, etc.)
    const details = useMemo(() => [
        { label: "Price", value: course.price },
        { label: "Duration", value: course.duration },
    ], [course]);

    return (
        <SectionContainer>
            <motion.div
                className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {/* Header */}
                <motion.h1
                    className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    variants={fadeUp}
                >
                    {course.title}
                </motion.h1>

                {/* Image */}
                <motion.div
                    className="relative aspect-[16/9] w-full rounded-xl shadow-md mb-4 overflow-hidden"
                    variants={fadeUp}
                >
                    <img
                        src={course.image}
                        alt={course.title}
                        loading="lazy"
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

                {/* Details cards */}
                <motion.div className="flex flex-wrap gap-4 mb-6" variants={fadeUp}>
                    {details.map((d, idx) => (
                        <div
                            key={idx}
                            className="flex-1 min-w-[120px] p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center shadow-sm"
                        >
                            <h4 className="text-gray-900 dark:text-white font-semibold text-sm">
                                {d.label}
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                {d.value}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Action Buttons */}
                <motion.div className="flex gap-4" variants={fadeUp}>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                        <Button
                            variant="primary"
                            onClick={() => navigate("/enroll", { state: { selectedCourse: course.id } })}
                        >
                            Enroll Today
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </SectionContainer>
    );
}
