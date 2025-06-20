'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Subject, Subjects as BaseSubjects } from '@/data/subjects';

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
      setInputValue('');
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
        Add subject (+)
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
              <h2 className="text-xl mb-4">Enter subject name</h2>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded mb-4"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type something..."
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer hover:opacity-80 transition-opacity duration-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:opacity-80 transition-opacity duration-100"
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

