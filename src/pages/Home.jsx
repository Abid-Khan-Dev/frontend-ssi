import React, { Suspense, useState } from "react";
// import Loader from "../components/common/Loader";
// import { ErrorBoundary } from "react-error-boundary";
// import ErrorFallback from "../components/common/ErrorFallback";

import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import CoursesSection from "../components/sections/CoursesSection";
import AdmissionsSection from "../components/sections/AdmissionsSection";
import AchievementsSection from "../components/sections/AchievementsSection";
import MembersSection from "../components/sections/MembersSection";
import ContactSection from "../components/sections/ContactSection";
import EventsSection from "../components/sections/EventsSection";


export default function Home() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <EventsSection />
            <CoursesSection />
            <AdmissionsSection />
            <AchievementsSection />
            {/* <MembersSection /> */}
            <ContactSection />
        </>
    );
}

