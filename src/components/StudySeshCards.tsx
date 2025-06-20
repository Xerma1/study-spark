'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Subject } from '@/data/subjects';
import { Topic } from '@/data/topic';
import Link from 'next/link';

export default function RenderStudySeshCards() {
  const params = useParams();
  const subjectIndex = Number(params.subjectId);
  const topicIndex = Number(params.topicId);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('subjects');
    if (stored) {
      const subjects: Subject[] = JSON.parse(stored);
      if (!isNaN(subjectIndex) && subjects[subjectIndex]) {
        setSubject(subjects[subjectIndex]);
      }
    }
  }, [subjectIndex]);

 

  useEffect(() => {
    if (subject) {
      const topics= subject.topics;
      if (!isNaN(topicIndex) && topics[topicIndex]) {
        setTopic(topics[topicIndex]);
      }
    }
  }, [topicIndex, subject]);

  if (!topic) {
    return <div className="text-white">Topic not found.</div>;
  }

  return (
    <div className="m-8">
      <h1 className="text-3xl font-bold text-white mb-4">{subject.name}</h1>
      <h1 className="text-2xl font-bold text-white">Topic {'>'} {topic.name}</h1>
      <h1 className="text-xl text-white pl-7 pt-4">Showing past study sessions:</h1>
      <div className="flex flex-col gap-4 m-4">
        {topic.studySessions && topic.studySessions.map((session, sessionId) => (
          <div
            key={sessionId}
            className="p-4 bg-blue-400 rounded hover:opacity-80 transition-opacity duration-100"
          >
            <h1 className="text-xl">{session.levelOfConfidence}, {session.date}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}