'use client';

import { useState, useEffect } from "react";
import { Subject} from "@/data/subjects";
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

  return (
    <div className="min-h-screen flex items-start justify-center">
      <main className="flex-1 p-8 flex flex-col max-w-4xl">
        <QuoteOfTheDay />
        <AddSubject subjects={subjects} setSubjects={setSubjects} />
        <RecommendTopics />
        <SubjectCards subjects={subjects} />
      </main>
    </div>
  );
}

