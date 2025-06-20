'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Subject } from '@/data/subjects';
import { Topic } from '@/data/topic';
import Link from 'next/link';
import { StudySession } from '@/data/studySession';

export default function RenderStudySeshCards({ sessions, subjectName, topicName }: { 
  sessions: StudySession[],
  subjectName: string,
  topicName: string
  }) {

  return (
    <div className="m-8">
      <h1 className="text-3xl font-bold text-white mb-4">{subjectName}</h1>
      <h1 className="text-2xl font-bold text-white">Topic {'>'} {topicName}</h1>
      <h1 className="text-xl text-white pl-7 pt-4">Showing past study sessions:</h1>
      <div className="flex flex-col gap-4 m-4">
        {sessions.map((session, sessionId) => (
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