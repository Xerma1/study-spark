'use client';

import RenderStudySeshCards from "@/components/StudySeshCards";
import AddStudySession from "@/components/AddStudySesh";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { StudySession } from "@/data/studySession";

export default function Page() {
    const [sessions, setSessions] = useState<StudySession[]>([]);
    const [subjectName, setSubjectName] = useState<string>('');
    const [topicName, setTopicName] = useState<string>('');
    const params = useParams();
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
          <AddStudySession sessions={sessions} setSessions={setSessions} />
          <RenderStudySeshCards sessions={sessions} subjectName={subjectName} topicName={topicName}/>
        </div>
      </div>
    );
}