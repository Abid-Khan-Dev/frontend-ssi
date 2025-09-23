import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Loader from '../components/common/Loader';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/common/ErrorFallback';

const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Contact = React.lazy(() => import('../pages/Contact'));
const AllCoursesPage = React.lazy(() => import('../pages/AllCoursesPage'))
const CourseDetailsPage = React.lazy(() => import('../pages/CourseDetailsPage'))
const EnrollPage = React.lazy(() => import('../pages/EnrollPage'));
const EventsPage = React.lazy(() => import('../pages/EventPage'));
const MembersPage = React.lazy(() => import('../pages/MembersPage'))
const ResultsPage = React.lazy(() => import('../pages/ResultsPage'))
const TermsAndCondition = React.lazy(() => import('../pages/TermsAndCondition'))


function AppRoutes() {
    return (
        <>
            {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}

            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<Layout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/courses' element={<AllCoursesPage />} />
                        <Route path="/course/:id" element={<CourseDetailsPage />} />
                        <Route path="/enroll" element={<EnrollPage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/results" element={<ResultsPage />} />


                        <Route path='/members' element={<MembersPage />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/terms' element={<TermsAndCondition />} />
                        <Route path="*" element={<Navigate to="/" replace />} />

                    </Route>
                </Routes>
            </Suspense>
            {/* </ErrorBoundary> */}
        </>
    )
}

export default AppRoutes
