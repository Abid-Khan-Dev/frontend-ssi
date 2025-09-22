import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { IoArrowBack } from "react-icons/io5";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (customDelay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut", delay: customDelay },
    }),
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const termsList = [
    "All course fees must be paid in full before access is granted.",
    "You must complete all modules in sequence; skipping is not allowed.",
    "Assignments must be submitted by the deadlines specified in each module.",
    "Certificates are awarded upon meeting a minimum score of 80% in assessments.",
    "Any form of plagiarism or academic dishonesty will lead to account suspension.",
    "Refund requests must be made within 7 days of enrollment; after that period, fees are non-refundable.",
    "You agree to respect the privacy and intellectual property of instructors and fellow students.",
    "The platform may update these Terms and Conditions; continued use implies acceptance of changes.",
    "For any questions or concerns, please contact our support team at support@example.com",
];

export default function TermsAndCondition() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 px-6 py-16">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                >
                    Terms & Conditions
                </motion.h1>

                {/* Intro */}
                <motion.p
                    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={0.1}
                >
                    Welcome to our <span className="font-semibold text-sky-600 dark:text-sky-400">course platform.</span> Please read and agree to the following rules before proceeding with your application.
                </motion.p>

                {/* Terms List */}
                <motion.ol
                    className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed mb-10"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {termsList.map((term, idx) => (
                        <motion.li key={idx} variants={fadeUp}>
                            {term}
                        </motion.li>
                    ))}
                </motion.ol>

                {/* Back Button */}
                <Button variant="secondary" onClick={() => navigate("/")}>
                    <IoArrowBack className="w-4 h-4 mr-2" /> Back to Home
                </Button>
            </div>
        </div>
    );
}
