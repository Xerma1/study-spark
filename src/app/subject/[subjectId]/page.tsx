'use client';

import TopicCards from '@/components/TopicCards';
import AddTopic from '@/components/AddTopic';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Topic } from '@/data/topic';

export default function SubjectPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const params = useParams();
  const subjectId = Number(params.subjectId);

  const router = useRouter();

  const [subjectName, setSubjectName] = useState<string>('');
  const [refresh, setRefresh] = useState(0);
  
  useEffect(() => {
    const stored = localStorage.getItem("subjects");
    if (stored) {
      const subjects = JSON.parse(stored);
      if (subjects[subjectId]) {
        setTopics(subjects[subjectId].topics || []);
        setSubjectName(subjects[subjectId].name || '');
      }
    } 
  }, [subjectId, refresh]);



  return (
    <div className="flex justify-center">
      <div className="flex-1 p-8 max-w-4xl">
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-200 text-blue-900 text-lg font-semibold px-5 py-2 rounded-2xl shadow transition-all duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
          onClick={() => router.back()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <AddTopic topics={topics} setTopics={setTopics} setRefresh={setRefresh} />
        <TopicCards topics={topics} subjectName={subjectName} refresh={refresh}/>
      </div>
    </div>
  );
}