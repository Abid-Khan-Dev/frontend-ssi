import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket } from "react-icons/fa";
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import ThreeModel from '../common/ThreeModel';

function HeroSection() {
    const particleCount = 50;
    const navigate = useNavigate()

    return (
        <section className="relative max-sm:pt-20 flex items-center justify-center min-h-screen 
            bg-gradient-to-b from-sky-50 to-white 
            dark:from-[#0a0f1c] dark:to-[#111827] 
            overflow-hidden transition-colors duration-500">

            {/* Floating Particles */}
            {[...Array(particleCount)].map((_, i) => {
                const size = Math.random() * 2 + 1;
                const opacity = Math.random() * 0.5 + 0.2;
                const startTop = Math.random() * 100;
                const startLeft = Math.random() * 100;
                const endTop = Math.random() * 100;
                const endLeft = Math.random() * 100;

                return (
                    <motion.div
                        key={i}
                        className="absolute bg-sky-400 rounded-full"
                        style={{ width: size, height: size, opacity, top: `${startTop}%`, left: `${startLeft}%` }}
                        animate={{
                            top: [`${startTop}%`, `${endTop}%`],
                            left: [`${startLeft}%`, `${endLeft}%`],
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatType: 'mirror',
                            duration: Math.random() * 15 + 5,
                            ease: 'linear'
                        }}
                    />
                )
            })}

            {/* Content Grid */}
            <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Left: SaaS-style Text */}
                <motion.div
                    className="text-left max-w-xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-extrabold tracking-tight 
                        text-gray-900 dark:text-white leading-tight"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    >
                        Shape Your <span className="text-sky-500 dark:text-sky-400">Future</span>
                    </motion.h1>

                    <motion.p
                        className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Master modern skills, launch your career, and build tomorrow with our hands-on training and expert guidance.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <Button aria-label="Join Now" variant="primary" className="hover:scale-105 transition-transform duration-300 shadow-lg" onClick={() => navigate("/enroll")}>
                            <FaRocket className="inline-block mr-2" /> Join Now
                        </Button>

                        <Button variant="outline" className="hover:scale-105 transition-transform duration-300"
                            onClick={() => navigate("/courses")} >
                            Explore Courses
                        </Button>
                    </motion.div>
                </motion.div>


                {/* Right: 3D Placeholder */}
                <motion.div
                    className="flex justify-center items-center h-[500px] "
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                >
                    <ThreeModel modelPath="./models/robot_playground.glb" scale={2.2} alt="3D model of a robot" />

                    {/* <img src="https://www.techlogix.com/wp-content/uploads/2025/03/sliderImg3b.png" alt="" /> */}
                </motion.div>
            </div>


            {/* Futuristic pulse line */}
            <motion.div
                className="absolute bottom-10 w-full flex justify-center z-10"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <div className="h-1 w-28 bg-sky-500 dark:bg-sky-400 animate-pulse rounded-full shadow-[0_0_20px_rgba(56,189,248,0.7)]"></div>
            </motion.div>
        </section>
    )
}

export default HeroSection;
