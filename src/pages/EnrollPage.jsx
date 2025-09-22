import React, { useState, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionContainer from "../components/common/SectionContainer";
import Button from "../components/common/Button";
import InputBox from "../components/common/InputBox";
import { Courses, referredByOptions } from "../data/courses";
import api from "../../services/api";

export default function EnrollPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Single state for form
    const [formData, setFormData] = useState({
        name: "",
        fatherName: "",
        education: "",
        address: "",
        email: "",
        phoneNO: "",
        applyFor: location.state?.selectedCourse || "",
        referredBy: "",
        terms: false,
    });

    // Handle input change
    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }, []);

    // Submit handler
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            if (!formData.applyFor) {
                alert("Please select a course.");
                return;
            }

            // Check duplicate enrollment in localStorage
            const existingEnrollment = localStorage.getItem("enrollmentData");
            if (existingEnrollment) {
                const confirmOverwrite = window.confirm(
                    "You have already enrolled. Do you want to overwrite your previous enrollment?"
                );
                if (!confirmOverwrite) return;
            }

            try {
                const response = await api.post("/enroll", formData);
                if (response.status === 200) {
                    alert("Enrollment successful!");
                    localStorage.setItem("enrollmentData", JSON.stringify(formData));
                    navigate("/");
                }
            } catch (err) {
                console.error(err);
                alert("Something went wrong. Please try again.");
            }
        },
        [formData, navigate]
    );

    // Motion variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };
    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
    };

    return (
        <SectionContainer>
            <div className="max-w-3xl mx-auto py-16 px-6">
                {/* Heading */}
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Enroll Today
                </motion.h1>
                <motion.p
                    className="text-gray-700 dark:text-gray-300 mb-10 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Fill out the form below to secure your spot in our courses. We'll contact you with the next steps.
                </motion.p>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md space-y-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <motion.div variants={containerVariants}>
                            <InputBox
                                label="Name*"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>

                        {/* Father Name */}
                        <motion.div variants={containerVariants}>
                            <InputBox
                                label="Father Name (Optional)"
                                placeholder="Your father name"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleChange}
                            />
                        </motion.div>

                        {/* Phone Number */}
                        <motion.div variants={containerVariants}>
                            <InputBox
                                label="Phone Number*"
                                type="tel"
                                placeholder="+92 300 1234567"
                                name="phoneNO"
                                value={formData.phoneNO}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={containerVariants}>
                            <InputBox
                                label="Email (Optional)"
                                type="email"
                                placeholder="you@example.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </motion.div>

                        {/* Education */}
                        <motion.div variants={containerVariants}>
                            <InputBox
                                label="Education Background*"
                                type="text"
                                placeholder="Your education background"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>

                        {/* Referred By */}
                        <motion.div variants={containerVariants}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Referred By
                            </label>
                            <select
                                name="referredBy"
                                value={formData.referredBy}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-sky-400 outline-none"
                            >
                                <option value="">Select a Referrer</option>
                                {referredByOptions.map((option, idx) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </motion.div>
                    </div>

                    {/* Address */}
                    <motion.div variants={containerVariants}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Address*
                        </label>
                        <textarea
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                focus:ring-2 focus:ring-sky-400 outline-none resize-none"
                            rows="3"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Your Address*"
                            required
                        ></textarea>
                    </motion.div>

                    {/* Course Dropdown */}
                    <motion.div variants={containerVariants}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Course Interested*
                        </label>
                        <select
                            name="applyFor"
                            value={formData.applyFor}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                focus:ring-2 focus:ring-sky-400 outline-none"
                        >
                            <option value="">Select a course</option>
                            {Courses.map((course) => (
                                <option key={course.id} value={course.name}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </motion.div>

                    {/* Terms */}
                    <motion.div variants={containerVariants}>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="terms"
                                checked={formData.terms}
                                onChange={handleChange}
                                required
                                className="mr-2"
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                                I agree to the
                                <Link to="/terms" className="text-sky-600 hover:underline ml-1">
                                    terms and conditions
                                </Link>.
                            </span>
                        </label>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div className="flex flex-wrap gap-4" variants={containerVariants}>
                        <Button variant="primary" type="submit">
                            Submit Enrollment
                        </Button>
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </motion.div>
                </motion.form>
            </div>
        </SectionContainer>
    );
}
