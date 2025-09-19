import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { IoArrowBack } from "react-icons/io5";

function TermsAndCondition() {
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
                    Terms & Conditions
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Welcome to our
                    <span className="font-semibold text-sky-600 dark:text-sky-400"> course platform. </span>
                    Please read and agree to the following rules before proceeding with your application.
                </motion.p>

                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}>
                    <li>All course fees must be paid in full before access is granted.</li>
                    <li>You must complete all modules in sequence; skipping is not allowed.</li>
                    <li>Assignments must be submitted by the deadlines specified in each module.</li>
                    <li>Certificates are awarded upon meeting a minimum score of 80% in assessments.</li>
                    <li>Any form of plagiarism or academic dishonesty will lead to account suspension.</li>
                    <li>Refund requests must be made within 7 days of enrollment; after that period, fees are non-refundable.</li>
                    <li>You agree to respect the privacy and intellectual property of instructors and fellow students.</li>
                    <li>The platform may update these Terms and Conditions; continued use implies acceptance of changes.</li>
                    <li>For any questions or concerns, please contact our support team at support@example.com</li>
                </ol>

                <div className="mb-10">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                        Please read and agree to the following rules before proceeding with your application.
                    </motion.p>
                </div>


                {/* Back Button */}
                <Button variant="secondary" onClick={() => navigate("/")}>
                    <IoArrowBack className="w-4 h-4 mr-2" /> Back to Home
                </Button>
            </div>
        </div>
    );
}



export default TermsAndCondition
