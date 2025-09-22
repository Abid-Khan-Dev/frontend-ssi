import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import ThreeModel from "../common/ThreeModel";

// Particle component
const Particle = ({ size, opacity, startTop, startLeft, endTop, endLeft }) => (
    <motion.div
        className="absolute bg-sky-400 rounded-full"
        style={{ width: size, height: size, opacity, top: `${startTop}%`, left: `${startLeft}%` }}
        animate={{
            top: [`${startTop}%`, `${endTop}%`],
            left: [`${startLeft}%`, `${endLeft}%`],
        }}
        transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: Math.random() * 15 + 5,
            ease: "linear",
        }}
    />
);

function HeroSection() {
    const navigate = useNavigate();
    const particleCount = 50;

    const particles = useMemo(() => {
        return [...Array(particleCount)].map((_, i) => {
            const size = Math.random() * 2 + 1;
            const opacity = Math.random() * 0.5 + 0.2;
            const startTop = Math.random() * 100;
            const startLeft = Math.random() * 100;
            const endTop = Math.random() * 100;
            const endLeft = Math.random() * 100;

            return (
                <Particle
                    key={i}
                    size={size}
                    opacity={opacity}
                    startTop={startTop}
                    startLeft={startLeft}
                    endTop={endTop}
                    endLeft={endLeft}
                />
            );
        });
    }, []);

    // Motion variants
    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const headingVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.8, ease: "easeOut" } },
    };

    const paragraphVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.8 } },
    };

    const buttonsVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8 } },
    };

    const modelVariants = {
        hidden: { opacity: 0, x: 50, scale: 0.9 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { delay: 0.8, duration: 0.8, ease: "easeOut" } },
    };

    return (
        <section className="relative flex items-center justify-center min-h-screen 
            bg-gradient-to-b from-sky-50 to-white 
            dark:from-[#0a0f1c] dark:to-[#111827] 
            overflow-hidden transition-colors duration-500">

            {/* Floating Particles */}
            {particles}

            {/* Content Grid */}
            <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Left Text */}
                <motion.div className="text-left max-w-xl" initial="hidden" animate="visible" variants={textVariants}>
                    <motion.h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight"
                        variants={headingVariants}>
                        Shape Your <span className="text-sky-500 dark:text-sky-400">Future</span>
                    </motion.h1>

                    <motion.p className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed" variants={paragraphVariants}>
                        Master modern skills, launch your career, and build tomorrow with our hands-on training and expert guidance.
                    </motion.p>

                    <motion.div className="flex flex-col sm:flex-row gap-4 mt-6" variants={buttonsVariants}>
                        <Button variant="primary" className="hover:scale-105 transition-transform duration-300 shadow-lg" onClick={() => navigate("/enroll")}>
                            <FaRocket className="inline-block mr-2" /> Join Now
                        </Button>
                        <Button variant="outline" className="hover:scale-105 transition-transform duration-300" onClick={() => navigate("/courses")}>
                            Explore Courses
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Right 3D Model */}
                <motion.div className="flex justify-center items-center h-[500px]" variants={modelVariants}>
                    <ThreeModel modelPath={'./models/robot_playground.glb'} scale={2.2} alt="3D model of a robot" />
                </motion.div>
            </div>

            {/* Futuristic pulse line */}
            <motion.div className="absolute bottom-10 w-full flex justify-center z-10"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}>
                <div className="h-1 w-28 bg-sky-500 dark:bg-sky-400 animate-pulse rounded-full shadow-[0_0_20px_rgba(56,189,248,0.7)]"></div>
            </motion.div>
        </section>
    );
}

export default HeroSection;
