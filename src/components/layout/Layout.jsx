import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import StickyActions from "../common/StickyActions";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />

            {/* Sticky Actions */}
            <StickyActions />
        </div>
    );
}
