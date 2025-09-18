// src/components/sections/AdmissionsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import SectionContainer from "../common/SectionContainer";
import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

export default function AdmissionsSection() {
    const navigate = useNavigate();

    return (
        <SectionContainer
            bg="bg-white dark:bg-gray-900 transition-colors duration-500"
            id="admissions"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center max-w-3xl mx-auto"
            >
                <SectionHeader
                    title="Start Your Journey With Us"
                    subtitle="Simple Steps to Secure Your Future"
                    description="Our admissions process is fast and student-friendly. Enroll now and become part of a community of forward-thinkers and innovators."
                />
            </motion.div>

            {/* CTA Button */}
            <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <Button
                    variant="primary"
                    className="hover:scale-105 transition-transform duration-300 shadow-lg"
                    onClick={() => navigate("/enroll")}
                >
                    Apply Now
                </Button>
            </motion.div>


        </SectionContainer>
    );
}
