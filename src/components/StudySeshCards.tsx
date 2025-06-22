import { StudySession } from '@/data/studySession';
import clsx from 'clsx';

export default function RenderStudySeshCards({ sessions, subjectName, topicName }: { 
  sessions: StudySession[],
  subjectName: string,
  topicName: string
  }) {
  
  if (sessions.length === 0){
    // handle empty sessions if needed
    return (
      <div className="m-8">
        <h1 className="text-3xl font-bold text-white mb-4">{subjectName}</h1>
        <h1 className="text-2xl font-bold text-white">Topic {'>'} {topicName}</h1>
        <h1 className="flex justify-center text-300 text-white mt-20">You have currently no study sessions, lets get started with our first one!</h1>
      </div>
    );
  }
  return (
    <div className="m-8">
      <h1 className="text-3xl font-bold text-white mb-4">{subjectName}</h1>
      <h1 className="text-2xl font-bold text-white">Topic {'>'} {topicName}</h1>
      <div className='flex items-center'>
        <img src="/study.svg" className="mt-1 -mr-4 w-7 h-7"/>
        <h1 className="text-xl text-white pl-7 pt-4">Showing past study sessions:</h1>
      </div>
      <div className="flex flex-col gap-4 m-4">
        {sessions.map((session, sessionId) => (
          <div
            key={sessionId}
            className={clsx(
              'p-4 rounded hover:opacity-80',
              {
                'bg-[#E62026]': session.levelOfConfidence === 'Low',
                'bg-[#E6C137]': session.levelOfConfidence === 'Medium',
                'bg-green-500': session.levelOfConfidence === 'High',
              }
            )}
          >
            <h1 className="text-black">{session.levelOfConfidence}, {session.date}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}