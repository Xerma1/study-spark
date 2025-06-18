'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Subject } from '@/data/subjects';
import Link from 'next/link';

export default function RenderTopicCards() {
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
    <div className="mt-8">
      <h1 className="text-2xl font-bold text-white">Subject {'>'} {subject.name}</h1>
      <h1 className="text-xl text-white pl-7 mt-2">Topics:</h1>
      <div className="flex flex-col gap-4 m-4">
        {subject.topics && subject.topics.map((topic, topicId) => (
          <Link
            href={`/subject/${index}/${topicId}`}
            key={topicId}
            className="p-4 bg-blue-400 rounded hover:opacity-80"
          >
            <h1 className="text-xl">{topic.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}