'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Subject } from '@/data/subjects';

export default function SubjectPage() {
  const params = useParams();
  const index = Number(params.subjectId); 
  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('subjects');
    if (stored) {
      const subjects: Subject[] = JSON.parse(stored);
      if (!isNaN(index) && subjects[index]) {
        setSubject(subjects[index]);
      }
    }
  }, [index]);

  if (!subject) {
    return <div className="text-white">Subject not found.</div>;
  }

  return (
    <div className="text-white text-3xl m-8">
      {subject.name}
      <h1 className="text-white text-2xl m-8">Topics: 0</h1>
    </div>
  );
}