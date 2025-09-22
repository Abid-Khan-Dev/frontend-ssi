import React, { Suspense } from "react";
import Loader from "../components/common/Loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/common/ErrorFallback";
import EventsSection from "../components/sections/EventsSection";

// Lazy-loaded sections
const HeroSection = React.lazy(() => import("../components/sections/HeroSection"));
const AboutSection = React.lazy(() => import("../components/sections/AboutSection"));
const CoursesSection = React.lazy(() => import("../components/sections/CoursesSection"));
const AdmissionsSection = React.lazy(() => import("../components/sections/AdmissionsSection"));
const AchievementsSection = React.lazy(() => import("../components/sections/AchievementsSection"));
const MembersSection = React.lazy(() => import("../components/sections/MembersSection"));
const ContactSection = React.lazy(() => import("../components/sections/ContactSection"));

export default function Home() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loader />}>
                <HeroSection />
                <AboutSection />
                <EventsSection />
                <CoursesSection />
                <AdmissionsSection />
                <AchievementsSection />
                <MembersSection />
                <ContactSection />
            </Suspense>
        </ErrorBoundary>
    );
}
