import React from "react";
import { motion } from "framer-motion";
import SectionContainer from "../common/SectionContainer";
import image from "../../assets/ssi-about.webp";
import { Link } from "react-router-dom";

export default function AboutSection() {


    return (
        <SectionContainer
            bg="bg-white dark:bg-gray-900 transition-colors duration-500"
            id="about"
        >
            <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between max-w-6xl mx-auto py-20 px-6 md:px-0 gap-12">

                {/* Left Content */}
                <motion.div
                    className="md:w-1/2 z-10"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                        Syed Software Institute
                    </h2>
                    <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
                        Empowering Bannu’s Talent with IT Skills
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-0 leading-relaxed">
                        Located in the heart of Bannu on Railway Road, Syed Software Institute delivers
                        hands-on, industry-aligned training in full-stack development, mobile & web
                        applications, graphic design, animation and digital marketing. With modern
                        computer labs, expert instructors and a vibrant community of over 1000+ learners,
                        SSI ensures every student gains practical skills and certification-ready projects
                        that employers value. Join us to transform your passion into professional expertise
                        — and lead Bannu’s tech revolution.

                    </p>
                    <Link
                        to="/about"
                        className="relative text-sky-500 text-sm font-medium after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Learn More
                    </Link>



                </motion.div>

                {/* Right Content */}
                <motion.div
                    className="md:w-1/2 relative flex justify-center items-center"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {/* Background Text */}
                    <motion.div
                        className="absolute text-[10rem] md:text-[16rem] font-extrabold text-transparent 
              bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600
              opacity-20 blur-3xl select-none pointer-events-none"
                        animate={{ opacity: [0.15, 0.3, 0.15] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    >
                        SSI
                    </motion.div>



                    {/* Main Image */}
                    <motion.div
                        className="w-full max-w-lg h-64 md:h-80 bg-gray-200 dark:bg-gray-800 
              rounded-xl shadow-xl flex items-center justify-center overflow-hidden"
                        animate={{ y: [0, -12, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={image}
                            alt="Illustration"
                            className="h-full w-full object-cover"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </SectionContainer>
    );
}
