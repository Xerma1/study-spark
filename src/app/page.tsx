'use client';

import { useState, useEffect } from "react";
import { Subject, Subjects as BaseSubjects } from "@/data/subjects";
import AddSubject from '@/components/AddSubject';
import SubjectCards from '@/components/SubjectCards';

export default function Page() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("subjects");
    if (stored) {
      setSubjects(JSON.parse(stored));
    } else {
      setSubjects(BaseSubjects);
      localStorage.setItem("subjects", JSON.stringify(BaseSubjects));
    }
  }, []);

  const resetSubjects = () => {
    localStorage.setItem('subjects', JSON.stringify(BaseSubjects));
    setSubjects(BaseSubjects); // Also update React state
  };

  return (
    <div className="flex items-start">
      <main className="flex-1 p-8 flex flex-col">
        <AddSubject subjects={subjects} setSubjects={setSubjects} />
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

