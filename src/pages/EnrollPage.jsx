// src/pages/EnrollPage.jsx
import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionContainer from "../components/common/SectionContainer";
import Button from "../components/common/Button";
import { Courses, referredByOptions } from "../data/courses";
import api from "../../services/api";
import InputBox from "../components/common/InputBox";

export default function EnrollPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = React.useState({
        name: "",
        fatherName: "",
        education: "",
        address: "",
        email: "",
        phoneNO: "",
        applyFor: "",
        referredBy: "",
    });
    const [selectedCourse, setSelectedCourse] = React.useState(location.state?.selectedCourse || "");
    const [selectedReferredBy, setSelectedReferredBy] = React.useState('');
    const [agreeTerms, setAgreeTerms] = React.useState(false);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        if (!selectedCourse) {
            alert("Please select a course.");
            return;
        }
        const existingEnrollment = localStorage.getItem('enrollmentData');

        if (existingEnrollment) {
            const confirmOverwrite = window.confirm("You have already enrolled. Do you want to overwrite your previous enrollment?");

            if (!confirmOverwrite) {
                return;
            }
        }
        const response = await api.post("/enroll", { ...formData, applyFor: selectedCourse, referredBy: selectedReferredBy, terms: agreeTerms }
        );
        if (response.status === 200) {
            alert("Enrollment successful!");
            localStorage.setItem('enrollmentData', JSON.stringify({ ...formData, applyFor: selectedCourse }));
            navigate("/");

        }
    };



    // motion variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
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
                            <InputBox label='Name*' placeholder='Enter your name' value={formData.name} name='name' onChange={handleChange} required />
                        </motion.div>


                        {/* father name */}
                        <motion.div variants={containerVariants}>
                            <InputBox label='Father Name (Optional)' placeholder='Your father name' value={formData.fatherName} name='fatherName' onChange={handleChange} />
                        </motion.div>

                        {/* Phone Number */}
                        <motion.div variants={containerVariants}>
                            <InputBox label='Phone Number*' required type="tel" placeholder='+92 300 1234567' value={formData.phoneNO} name='phoneNO' onChange={handleChange} />
                        </motion.div>


                        {/* Email */}
                        <motion.div variants={containerVariants}>
                            <InputBox label='Email (Optional)' type="email" placeholder='you@example.com' value={formData.email} name='email' onChange={handleChange} />
                        </motion.div>




                        {/* education background */}
                        <motion.div variants={containerVariants}>
                            <InputBox label='Education Background*' required type="text" placeholder='Your education background' value={formData.education} name='education' onChange={handleChange} />
                        </motion.div>

                        {/* Referred By */}
                        <motion.div variants={containerVariants}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Referred By
                            </label>
                            <select
                                onChange={(e) => setSelectedReferredBy(e.target.value)}
                                name="referredBy"
                                defaultValue={selectedReferredBy} // preselect course if passed from CourseDetails
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700
                                bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                focus:ring-2 focus:ring-sky-400 outline-none"
                            >
                                <option value="">Select a Referrer</option>
                                {referredByOptions.map((referredBy, idx) => (
                                    <option key={idx} value={referredBy}>
                                        {referredBy}
                                    </option>
                                ))}
                            </select>
                        </motion.div>
                    </div>

                    {/*  Address */}
                    <motion.div variants={containerVariants}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Address*
                        </label>
                        <textarea
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700
                                bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                                focus:ring-2 focus:ring-sky-400 outline-none resize-none"
                            rows="3"
                            placeholder="Your Address*"
                            value={formData.address}
                            name='address'
                            onChange={handleChange}
                            required
                        ></textarea>

                    </motion.div>


                    {/* Course Dropdown */}
                    <motion.div variants={containerVariants}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Course Interested*
                        </label>
                        <select
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            name="applyFor"
                            required
                            defaultValue={selectedCourse}
                            className="w-full  p-3 rounded-lg border border-gray-300 dark:border-gray-700
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

                    {/* terms and conditions */}
                    <motion.div variants={containerVariants}>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="terms"
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                checked={agreeTerms}
                                required
                                className="mr-2 "
                            />
                            <span className="text-gray-700 dark:text-gray-300"> I agree to the <Link to="/terms" className="text-sky-600 hover:underline ml-1"> terms and conditions</Link>.</span>
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
