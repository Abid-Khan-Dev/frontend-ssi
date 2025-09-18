import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 px-6 py-16">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    About Syed Software Institute
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    At <span className="font-semibold text-sky-600 dark:text-sky-400">SSI</span>,
                    we are on a mission to empower Bannu’s youth with future-ready digital skills.
                    Our programs are designed for beginners and professionals alike — blending
                    industry standards, hands-on projects, and mentorship.
                </motion.p>

                {/* Highlights */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <motion.div
                        className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Modern Labs
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            Equipped with high-performance systems and fast internet, our labs
                            ensure every learner can practice and build projects efficiently.
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Expert Trainers
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            Learn from instructors who work on real-world projects and bring
                            industry experience into the classroom.
                        </p>
                    </motion.div>
                </div>

                {/* Back Button */}
                <Button variant="secondary" onClick={() => navigate("/")}>
                    ← Back to Home
                </Button>
            </div>
        </div>
    );
}
