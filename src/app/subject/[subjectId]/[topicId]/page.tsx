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
    }, [subjectId, topicId]);

    return(
      <div className="flex justify-center">
        <div className="flex-1 p-8 max-w-4xl">
          <button
            className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#415A77] hover:brightness-120 text-[#E0E1DD] font-semibold shadow transition-brightness duration-150"
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