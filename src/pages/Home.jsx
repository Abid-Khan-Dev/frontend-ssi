import React, { Suspense } from "react";
import Loader from "../components/common/Loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/common/ErrorFallback";
import EventsSection from "../components/sections/EventsSection";

const HeroSection = React.lazy(() => import("../components/sections/HeroSection"));
const AboutSection = React.lazy(() => import("../components/sections/AboutSection"));
const CoursesSection = React.lazy(() => import("../components/sections/CoursesSection"));
const AdmissionsSection = React.lazy(() => import("../components/sections/AdmissionsSection"));
const AchievementsSection = React.lazy(() => import("../components/sections/AchievementsSection"));
const MembersSection = React.lazy(() => import("../components/sections/MembersSection"));
const ContactSection = React.lazy(() => import("../components/sections/ContactSection"));

export default function Home() {
    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loader />}>
                    <HeroSection />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <AboutSection />
                </Suspense>
                <EventsSection />
                <Suspense fallback={<Loader />}>
                    <CoursesSection />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <AdmissionsSection />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <AchievementsSection />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <MembersSection />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <ContactSection />
                </Suspense>
            </ErrorBoundary>
        </>
    );
}
