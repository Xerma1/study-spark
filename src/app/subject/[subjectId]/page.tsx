'use client';

import TopicCards from '@/components/TopicCards';
import AddTopic from '@/components/AddTopic';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Topic } from '@/data/topic';

export default function SubjectPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const params = useParams();
  const subjectId = Number(params.subjectId);
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
        <AddTopic topics={topics} setTopics={setTopics} setRefresh={setRefresh} />
        <TopicCards topics={topics} subjectName={subjectName} refresh={refresh}/>
      </div>
    </div>
  );
}