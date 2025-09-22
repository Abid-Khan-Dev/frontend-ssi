import React, { useMemo } from "react";
import { motion } from "framer-motion";
import SectionContainer from "../components/common/SectionContainer";
import SectionHeader from "../components/common/SectionHeader";
import Card from "../components/common/Card";
import { members } from "../data/members";

export default function MembersPage() {
    // Motion variants
    const containerVariants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.15 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    // Memoize members to avoid recalculation on every render
    const memoizedMembers = useMemo(() => members, []);

    return (
        <SectionContainer bg="bg-white dark:bg-gray-900 transition-colors duration-500">
            {/* Page Header */}
            <SectionHeader
                title="Our Team"
                subtitle="Meet the Experts"
                description="Our dedicated instructors and developers guide you through hands-on learning, real-world projects, and industry insights to master future-ready skills."
            />

            {/* Members Grid */}
            <motion.div
                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 px-4 md:px-0"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {memoizedMembers.map((member, index) => (
                    <motion.div key={index} variants={cardVariants}>
                        <MemoCard
                            image={member.image}
                            title={member.name}
                            description={member.role}
                            variant="member"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </SectionContainer>
    );
}

// Wrap Card in React.memo for memoization
const MemoCard = React.memo(Card);
