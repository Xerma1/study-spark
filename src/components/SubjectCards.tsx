'use client';

import { Subject } from "@/data/subjects";
import Link from 'next/link';

export default function RenderSubjectCards({ subjects }: { subjects: Subject[] }) {
  return (
    <div className="mt-8">
      <h1 className="text-white font-bold text-3xl">
        Courses: {subjects.length}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {subjects.map((subject, subjectId) => (
          <Link 
            href={`/subject/${subjectId}`} 
            key={subjectId} 
            className="p-4 bg-blue-400 rounded hover:opacity-80 block"
          >
            <h1>{subject.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}