// src/pages/ResultsPage.jsx
import React, { useState } from "react";
import { results } from "../data/results";
import SectionContainer from "../components/common/SectionContainer";
import SectionHeader from "../components/common/SectionHeader";
import ImageModal from "../components/common/ImageModal";

export default function ResultsPage() {

  const [selected, setSelected] = useState(null);

  const allSubjects = Array.from(
    new Set(results.flatMap((r) => r.courses.map((c) => c.Subject)))
  );

  const [activeTab, setActiveTab] = useState(allSubjects[0]);

  return (
    <SectionContainer
      bg="bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
      id="results"
    >
      {/* Section Header */}
      <SectionHeader
        title="Student Results"
        subtitle="Check Your Performance"
        description="Browse through results by course. Marks and uploaded images are displayed automatically."
      />

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 mb-10">
        {allSubjects.map((subject) => (
          <button
            key={subject}
            className={`px-5 py-2 rounded-full font-medium border-2 transition-colors duration-300 ${activeTab === subject
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-blue-600 hover:text-white"
              }`}
            onClick={() => setActiveTab(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results
          .filter((r) => r.courses.some((c) => c.Subject === activeTab))
          .map((student) => {
            const course = student.courses.find(
              (c) => c.Subject === activeTab
            );

            return (
              <div
                key={student.enrollmentId}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300"
              >
                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {student.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {student.fatherName}
                </p>

                {/* Result */}
                {course.Marks !== undefined && course.Marks !== null && (
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {course.Marks}
                    </span>
                  </div>
                )}

                {course.Image && (
                  <img
                    onClick={() => setSelected(course.Image)}
                    src={course.Image}
                    alt={`${student.name} Result`}
                    className="w-32 h-32 object-cover rounded-lg mb-3"
                  />
                )}

                {!course.Marks && !course.Image && (
                  <span className="text-gray-400">No Result</span>
                )}

                <span className="mt-auto text-sm text-gray-400">
                  Enrollment ID: {student.enrollmentId}
                </span>
              </div>
            );
          })}
      </div>
      {selected && <ImageModal item={selected} onClose={() => setSelected(null)} event />}
    </SectionContainer>
  );
}
