'use client';

import { useState} from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Subject} from '@/data/subjects';
import { StudySession } from '@/data/studySession';
import Calendar from 'react-calendar';
import calcTopicScore from '@/utils/calcTopicScore';
import 'react-calendar/dist/Calendar.css';



interface AddSeshProp {
  sessions: StudySession[];
  setSessions: (sessions: StudySession[]) => void;
}

export default function AddStudySession({ sessions, setSessions }: AddSeshProp) {

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState<Date>(new Date());

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const params = useParams();
  const subjectIndex = Number(params.subjectId);
  const topicIndex = Number(params.topicId);

  const handleSubmit = () => {
    if (inputValue1.trim() !== "" && inputValue2.toDateString().trim() !== "") {
      // Get subjects from localStorage
      const stored = localStorage.getItem('subjects');
      if (stored) {
        const subjects: Subject[] = JSON.parse(stored);
        const subject = subjects[subjectIndex];
        const topic = subject.topics[topicIndex];
        // Add study session to correct topic
        if (topic) {
          const newSesh = [...sessions, new StudySession(inputValue1, inputValue2.toDateString())];
          setSessions(newSesh);
          // Update the topic studySessions array
          topic.studySessions.push(new StudySession(inputValue1, inputValue2.toDateString()));
          // Calculate the new score for the topic
          const newScore = calcTopicScore(topic);
          // Update the score of the topic with the new score
          topic.score = newScore;
          // Save to local storage
          localStorage.setItem('subjects', JSON.stringify(subjects));
          window.dispatchEvent(new Event("subjectsUpdated"));
        }
      }
      setInputValue1('');
      setInputValue2(new Date());
      closeModal();
    }
  };
  

  return (
    <div className="p-8">
      <button
        className="block bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 hover:from-blue-700 hover:to-purple-600 text-white text-2xl font-bold px-4 py-3 rounded-2xl shadow-lg w-full transition-all duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
        onClick={openModal}
      >
        <span className="inline-flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Study Session
        </span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          >
            <motion.div
              key="modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-purple-100 p-6 rounded-2xl shadow-2xl w-96 border border-blue-200"
            >
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Enter study session confidence level</h2>
              <select
                className="w-full border border-blue-200 p-2 rounded mb-4 focus:ring-2 focus:ring-purple-300 focus:outline-none bg-white/80 text-blue-900"
                value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
              >
                <option value="" disabled>Select confidence level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <h2 className="text-2xl font-bold mb-4 text-blue-900">Enter date</h2>
              <Calendar
                onChange={value => setInputValue2((value as Date) ?? new Date())}
                value={inputValue2}
              />
              <p className="text-blue-900 mt-2">Selected date: {inputValue2.toDateString()}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-200 text-blue-900 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-500 to-purple-400 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-500 transition"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}