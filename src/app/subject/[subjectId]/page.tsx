'use client';

import TopicCards from '@/components/TopicCards';
import AddTopic from '@/components/AddTopic';
import { useState, useEffect } from 'react';

export default function SubjectPage() {
  const [topics, setTopics] = useState<any[]>([]);

  return (
    <div className="p-8">
      <AddTopic topics={topics} setTopics={setTopics} />
      <TopicCards />
    </div>
  );
}