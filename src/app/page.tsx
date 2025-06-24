'use client';

import { useState, useEffect } from "react";
import { Subject, Subjects as BaseSubjects } from "@/data/subjects";
import AddSubject from '@/components/AddSubject';
import SubjectCards from '@/components/SubjectCards';
import RecommendTopics from "@/components/RecTopics";
import QuoteOfTheDay from "@/components/QuoteOfTheDay";

export default function Page() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    // Initial load
    const stored = localStorage.getItem("subjects");
    if (stored) {
      setSubjects(JSON.parse(stored));
    }
    // Listen for updates
    const handleUpdate = () => {
      const updated = localStorage.getItem("subjects");
      if (updated) setSubjects(JSON.parse(updated));
    };
    window.addEventListener("subjectsUpdated", handleUpdate);
    return () => window.removeEventListener("subjectsUpdated", handleUpdate);
  }, []);

  const resetSubjects = () => {
    localStorage.setItem('subjects', JSON.stringify(BaseSubjects));
    window.dispatchEvent(new Event("subjectsUpdated"));
    setSubjects(BaseSubjects); // Also update React state
  };

  return (
    <div className="min-h-screen flex items-start justify-center">
      <main className="flex-1 p-8 flex flex-col max-w-4xl">
        <QuoteOfTheDay />
        <AddSubject subjects={subjects} setSubjects={setSubjects} />
        <RecommendTopics />
        <div className="flex">
          <button className="bg-[#D12E34] text-[#E0E1DD] cursor-pointer p-2 rounded-xl"
            onClick={resetSubjects}>
              For development: Reset to base data
          </button>
        </div>
        <SubjectCards subjects={subjects} />
      </main>
    </div>
  );
}

