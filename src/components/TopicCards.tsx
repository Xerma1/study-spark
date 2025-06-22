'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Topic } from '@/data/topic';
import sortTopicsInLocalStorage from '@/utils/sortTopics';
import Link from 'next/link';

export default function RenderTopicCards({ topics, subjectName }: { topics: Topic[], subjectName: string }) {
  const params = useParams();
  const index = Number(params.subjectId);

  const [sortedTopics, setSortedTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const sorted = sortTopicsInLocalStorage(index) || [];
    setSortedTopics(sorted);
  }, [index]);

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold text-white">Subject {'>'} {subjectName}</h1>
      <h1 className="text-xl text-white pl-7 mt-2">Topics:</h1>
      <div className="flex flex-col gap-4 m-4">
        {sortedTopics.map((topic, topicId) => (
          <Link
            href={`/subject/${index}/${topicId}`}
            key={topicId}
            className="p-4 bg-blue-400 rounded hover:opacity-80 transition-opacity duration-100"
          > 
            <div className="flex justify-between">
              <h1>{topic.name}</h1>
              <h1 className="font-bold">Score: {topic.score}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}