'use client';

import { useState} from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Subject} from '@/data/subjects';
import { Topic } from '@/data/topic';



interface AddTopicsProp {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddTopic({ topics, setTopics, setRefresh }: AddTopicsProp) {

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const params = useParams();
  const subjectIndex = Number(params.subjectId);

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      // Get subjects from localStorage
      const stored = localStorage.getItem('subjects');
      if (stored) {
        const subjects: Subject[] = JSON.parse(stored);
        // Add topic to the correct subject
        if (subjects[subjectIndex]) {
          const newTopics = [...topics, new Topic(inputValue, [], 0)];
          setTopics(newTopics);
          subjects[subjectIndex].topics.push(new Topic(inputValue, [], 0));
          // Save back to localStorage
          localStorage.setItem('subjects', JSON.stringify(subjects));
          window.dispatchEvent(new Event("subjectsUpdated"));
          setRefresh(r => r + 1);
        }
      }
      setInputValue('');
      closeModal();
    }
  };
  

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex gap-4 mb-4">
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 hover:from-blue-700 hover:to-purple-600 text-white text-lg font-semibold px-5 py-2 rounded-2xl shadow transition-all duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full justify-center"
          onClick={openModal}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Topic
        </button>
      </div>

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
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Enter Topic name</h2>
              <input
                type="text"
                className="w-full border border-blue-200 p-2 rounded mb-4 focus:ring-2 focus:ring-purple-300 focus:outline-none bg-white/80 text-blue-900"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type something..."
              />
              <div className="flex justify-end space-x-2">
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