'use client';

import RenderStudySeshCards from "@/components/StudySeshCards";
import AddStudySession from "@/components/AddStudySesh";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { StudySession } from "@/data/studySession";

export default function Page() {
    const [sessions, setSessions] = useState<StudySession[]>([]);
    const [subjectName, setSubjectName] = useState<string>('');
    const [topicName, setTopicName] = useState<string>('');
    const params = useParams();
    const router = useRouter();
    const subjectId = Number(params.subjectId);
    const topicId = Number(params.topicId);
      
    useEffect(() => {
      const updateSessions = () => {
        const stored = localStorage.getItem("subjects");
        if (stored) {
          const subjects = JSON.parse(stored);
          if (subjects[subjectId] && (subjects[subjectId].topics)[topicId]) {
            const topic = (subjects[subjectId].topics)[topicId]
            setSubjectName(subjects[subjectId].name || '');
            setTopicName(topic.name || '');
            setSessions(topic.studySessions || []);
          }
        }
      };
      updateSessions(); // initial load
      window.addEventListener("subjectsUpdated", updateSessions);
      return () => window.removeEventListener("subjectsUpdated", updateSessions);
    }, [subjectId, topicId]);

    return(
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
          <AddStudySession sessions={sessions} setSessions={setSessions} />
          <RenderStudySeshCards sessions={sessions} subjectName={subjectName} topicName={topicName} subjectIndex={subjectId} topicIndex={topicId}/>
        </div>
      </div>
    );
}