'use client';

import { Subject } from "@/data/subjects";
import { useState, useRef, useEffect } from "react";
import Link from 'next/link';

export default function RenderSubjectCards({ subjects }: { subjects: Subject[] }) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (openMenu === null) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  return (
    <div className="mt-8">
      <div className="flex items-center">
        <img src="/courses.svg" className="mr-4 w-7 h-7"/>
        <h1 className="text-white font-bold text-3xl">
          Courses
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {subjects.map((subject, subjectId) => (
          <div key={subjectId} className="relative">
            <Link 
              href={`/subject/${subjectId}`}
              className="p-4 bg-blue-400 rounded hover:opacity-80 transition-opacity duration-100 block"
            >
              <div className="flex justify-between items-center">
                <h1>{subject.name}</h1>
                <button
                  className="text-black text-2xl px-2 opacity-20 hover:opacity-100 transition-opacity duration-100"
                  onClick={e => {
                    e.preventDefault();
                    setOpenMenu(openMenu === subjectId ? null : subjectId);
                  }}
                >
                  &#x22EE; {/* Unicode for vertical ellipsis */}
                </button>
              </div>
            </Link>
            {openMenu === subjectId && (
              <div
                ref={menuRef}
                className="absolute right-4 top-12 bg-white rounded shadow-lg z-10 flex flex-col"
              >
                <button className="px-4 py-2 hover:bg-gray-300 transition-colors duration-150 text-left">Edit</button>
                <button className="px-4 py-2 hover:bg-gray-300 transition-colors duration-150 text-left text-red-600">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}