import React from "react";
import { motion } from "framer-motion";
import Button from "../components/common/Button";
import SectionContainer from "../components/common/SectionContainer";
import SectionHeader from "../components/common/SectionHeader";
import InputBox from "../components/common/InputBox";
import api from "../../services/api";

export default function Contact() {

    const [formData, setFormData] = React.useState({
        fullname: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await api.post('/contact', formData)
        console.log(response);

    }
    return (
        <SectionContainer
            bg="bg-white dark:bg-gray-900 transition-colors duration-500"
            id="contact"
        >
            <SectionHeader
                title="Contact Us"
                subtitle="We’d Love to Hear From You"
                description="Have questions or need more information? Fill out the form below or reach out directly — our team is here to help you!"
            />

            {/* Form + Info Grid */}
            <div className="grid md:grid-cols-2 gap-10 mt-12 max-w-5xl mx-auto">
                {/* Contact Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div>
                        <InputBox label='Full Name' placeholder='Your full name' value={formData.fullname} name='fullname' onChange={handleChange} />
                    </div>

                    <div>
                        <InputBox label='Email' type="email" placeholder='you@example.com' value={formData.email} name='email' onChange={handleChange} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Message
                        </label>
                        <textarea
                            onChange={handleChange}
                            rows="4"
                            name="message"
                            value={formData.message}
                            placeholder="Write your message..."
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 
                bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-400 outline-none"
                        />
                    </div>

                    <Button variant="primary" className="w-full">
                        Send Message
                    </Button>
                </motion.form>

                {/* Contact Info */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Email Us
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">support@ssi.com</p>
                    </div>

                    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Call Us
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">+92 123 456 7890</p>
                    </div>
                </motion.div>
            </div>
        </SectionContainer>
    );
}
