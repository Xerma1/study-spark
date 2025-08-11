'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Subject} from '@/data/subjects';

interface AddSubjectProps {
  subjects: Subject[];
  setSubjects: (subjects: Subject[]) => void;
}

export default function AddSubject({ subjects, setSubjects }: AddSubjectProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      const newSubjects = [...subjects, new Subject(inputValue, 0,[])];
      setSubjects(newSubjects);
      localStorage.setItem('subjects', JSON.stringify(newSubjects));
      window.dispatchEvent(new Event("subjectsUpdated"));
      setInputValue('');
      closeModal();
    }
  };

  return (
    <div className="p-8"> 
      <button
        className="block bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 hover:from-blue-700 hover:to-purple-600 text-white text-xl font-semibold px-6 py-3 rounded-2xl shadow-lg w-full transition-all duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
        onClick={openModal}
      >
        <span className="inline-flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add course
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
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Enter subject name</h2>
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

