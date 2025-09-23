import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavigationLinks from "../common/NavigationLinks";
import { navLinks } from "../../data/navLinks.js";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    );
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle("dark", !isDark);
        localStorage.setItem("theme", !isDark ? "dark" : "light");
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }

        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Framer Motion variants
    const menuVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const menuItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 ${scrolled
                ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm"
                : "bg-transparent"
                }`}
        >
            <motion.nav
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto flex items-center justify-between px-6 py-3 transition-colors duration-300"
            >
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <motion.img
                            src='https://res.cloudinary.com/dhnkdcbz4/image/upload/v1758515661/logo_igh9nz.webp'
                            alt="logo"
                            className="h-12 w-12 rounded-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <motion.ul
                    className="hidden md:flex gap-8 text-gray-900 dark:text-gray-200 font-medium text-sm"
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {navLinks.map((link, index) => (
                        <motion.li
                            key={index}
                            className="group relative"
                            variants={menuItemVariants}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <NavigationLinks to={link.to} label={link.label} />
                        </motion.li>
                    ))}
                </motion.ul>

                {/* Theme & Mobile Menu */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full cursor-pointer bg-gray-200 dark:outline dark:hover:text-sky-400 hover:text-sky-500 dark:outline-gray-700 dark:bg-transparent text-gray-800 dark:text-gray-200"
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
                >
                    <ul className="flex flex-col gap-4 px-6 py-4 text-gray-900 dark:text-gray-200 font-medium">
                        {navLinks.map((link, index) => (
                            <motion.li
                                key={index}
                                variants={menuItemVariants}
                                onClick={() => setMobileMenuOpen(false)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <NavigationLinks to={link.to} label={link.label} />
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </header>
    );
}
