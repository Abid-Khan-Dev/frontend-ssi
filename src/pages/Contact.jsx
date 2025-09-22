// src/pages/Contact.jsx
import React, { useCallback, useMemo } from "react";
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

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/contact', formData);
            console.log(response);
            alert("Message sent successfully!");
            setFormData({ fullname: "", email: "", message: "" });
        } catch (err) {
            console.error(err);
            alert("Failed to send message. Please try again.");
        }
    }, [formData]);

    // Contact info cards
    const contactInfo = useMemo(() => [
        { title: "Email Us", value: "support@ssi.com" },
        { title: "Call Us", value: "+92 123 456 7890" },
    ], []);

    // Motion variants
    const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

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

            <div className="grid md:grid-cols-2 gap-10 mt-12 max-w-5xl mx-auto">
                {/* Contact Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeUp}
                    viewport={{ once: true }}
                >
                    {[
                        { label: "Full Name", name: "fullname", type: "text", placeholder: "Your full name" },
                        { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
                    ].map((input) => (
                        <InputBox
                            key={input.name}
                            label={input.label}
                            type={input.type}
                            placeholder={input.placeholder}
                            value={formData[input.name]}
                            name={input.name}
                            onChange={handleChange}
                        />
                    ))}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Message
                        </label>
                        <textarea
                            onChange={handleChange}
                            rows={4}
                            name="message"
                            value={formData.message}
                            placeholder="Write your message..."
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 
                                bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-400 outline-none"
                        />
                    </div>

                    <Button variant="primary" className="w-full">Send Message</Button>
                </motion.form>

                {/* Contact Info Cards */}
                <motion.div
                    className="space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeUp}
                    viewport={{ once: true }}
                >
                    {contactInfo.map((info, idx) => (
                        <div key={idx} className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{info.value}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </SectionContainer>
    );
}
