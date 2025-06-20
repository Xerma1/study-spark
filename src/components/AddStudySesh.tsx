'use client';

import { useState} from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Subject} from '@/data/subjects';
import { StudySession } from '@/data/studySession';
import Calendar from 'react-calendar';
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
          // Save back to localStorage
          topic.studySessions.push(new StudySession(inputValue1, inputValue2.toDateString()));
          localStorage.setItem('subjects', JSON.stringify(subjects));
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
        className="block bg-[#415A77] hover:bg-[#E0E1DD] hover:text-[#0D1B2A] transition-colors duration-100
        text-[#E0E1DD] text-2xl font-bold px-4 py-2 rounded-xl w-full cursor-pointer"
        onClick={openModal}
      >
        Add Study Session (+)
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
              className="bg-white p-6 rounded-lg shadow-lg w-96"
            >

              <h2 className="text-xl mb-4">Enter study session confidence level</h2>
              <select
                className="w-full border border-gray-300 p-2 rounded mb-4"
                value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
              >
                <option value="" disabled>Select confidence level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <h2 className="text-xl mb-4">Enter date</h2>
              <Calendar
                onChange={setInputValue2}
                value={inputValue2}
              />
              <p className="text-white mt-2">Selected date: {inputValue2.toDateString()}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
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