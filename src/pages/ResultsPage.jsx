// src/pages/ResultsPage.jsx
import React, { useState, useMemo, useCallback } from "react";
import { results } from "../data/results";
import SectionContainer from "../components/common/SectionContainer";
import SectionHeader from "../components/common/SectionHeader";
import EventModal from "../components/common/EventModal";
import { Image } from "lucide-react";

const ResultCard = React.memo(function ResultCard({ item, onSelect }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300 cursor-pointer outline-2 outline-gray-200 dark:outline-gray-700 max-w-lg"
      onClick={() => item.image && onSelect(item.image)}
    >
      {/* Course Title */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {item.course}
      </h3>

      {/* Description */}
      {item.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
          {item.description}
        </p>
      )}

      {/* Marks / Date */}
      {item.marks && (
        <div className="mb-2">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {item.marks}
          </span>
        </div>
      )}
      {item.date && (
        <span className="text-sm text-gray-400 mb-3">{item.date}</span>
      )}

      {/* Image */}
      {item.image && (
        <div className="relative aspect-[16/9] w-full max-w-lg rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
          <img
            src={item.image}
            alt={`${item.course} result`}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex items-center bg-gray-800/60 dark:bg-gray-200/30 text-white dark:text-gray-900 text-xs font-semibold px-2 py-1 rounded-full">
            <Image className="w-3 h-3 mr-1" /> View
          </div>
        </div>
      )}
    </div>
  );
});

export default function ResultsPage() {
  const [selected, setSelected] = useState(null);

  const allSubjects = useMemo(() => {
    const subjects = Array.from(new Set(results.map((r) => r.course)));
    return ["All", ...subjects];
  }, []);

  const [activeTab, setActiveTab] = useState("All");

  const filteredResults = useMemo(
    () =>
      activeTab === "All"
        ? results
        : results.filter((r) => r.course === activeTab),
    [results, activeTab]
  );

  // 🔹 Stable callback for modal open
  const handleSelect = useCallback((image) => {
    setSelected([image]);
  }, []);

  return (
    <SectionContainer
      id="results"
    >
      {/* Header */}
      <SectionHeader
        title="Student Results"
        subtitle="Check Your Performance"
        description="Browse through results by course. Marks, images, and dates are displayed."
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

      {/* Result Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredResults.map((item, index) => (
          <ResultCard key={index} item={item} onSelect={handleSelect} />
        ))}
      </div>


      {/* Image Modal */}
      {selected && (
        <EventModal
          items={selected}
          initialIndex={0}
          onClose={() => setSelected(null)}
        />
      )}
    </SectionContainer>
  );
}
