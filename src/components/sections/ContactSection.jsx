import React from "react";
import { motion } from "framer-motion";
import SectionContainer from "../common/SectionContainer";
import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { whatsappLink } from "../../data/socialLinks";

export default function ContactSection() {
    const navigate = useNavigate()


    return (
        <SectionContainer
            id="contact"
            contact={true}
        >
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <SectionHeader
                    title="Let’s Connect Today"
                    subtitle="We’re Here to Help You Succeed"
                    description="Reach out for inquiries, guidance, or collaborations. Our team is always ready to assist you in your learning journey."
                    contact={true}
                />
            </motion.div>

            {/* Call-to-Action Buttons */}
            <motion.div
                className="flex justify-center gap-4 mt-8 flex-wrap"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <Button
                    variant="primary"
                    className="hover:scale-105 transition-transform duration-300"
                    onClick={() => navigate('/contact')}
                >
                    Contact Us
                </Button>

                <Button
                    variant="outline"
                    className="hover:scale-105 transition-transform duration-300"
                    onClick={() => window.open(whatsappLink, "_blank")}
                >
                    Chat Now
                </Button>
            </motion.div>
        </SectionContainer>
    );
}
