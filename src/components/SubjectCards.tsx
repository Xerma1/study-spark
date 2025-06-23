'use client';

import { Subject } from "@/data/subjects";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import calcSubjectScore from "@/utils/calcSubjectScore";
import Link from 'next/link';

export default function RenderSubjectCards({ subjects }: { subjects: Subject[] }) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [subjectList, setSubjectList] = useState(subjects);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    setSubjectList(subjects);
  }, [subjects]);

  useEffect(() => {
    if (openMenu === null) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);
  
  const openEditModal = (subjectId: number) => {
    setEditingId(subjectId);
    setEditValue(subjectList[subjectId].name);
    setEditModalOpen(true);
    setOpenMenu(null);
  };

  const handleEditSave = () => {
    if (editingId === null) return;
    const updated = [...subjectList];
    updated[editingId] = { ...updated[editingId], name: editValue };
    setSubjectList(updated);
    // Update localStorage
    const stored = localStorage.getItem('subjects');
    if (stored) {
      const subjectsArr = JSON.parse(stored);
      subjectsArr[editingId].name = editValue;
      localStorage.setItem('subjects', JSON.stringify(subjectsArr));
      window.dispatchEvent(new Event("subjectsUpdated"));
    }
    setEditModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (subjectId: number) => {
    // Remove from UI
    const updated = subjectList.filter((_, idx) => idx !== subjectId);
    setSubjectList(updated);

    // Remove from localStorage
    const stored = localStorage.getItem('subjects');
    if (stored) {
      const subjectsArr = JSON.parse(stored);
      subjectsArr.splice(subjectId, 1);
      localStorage.setItem('subjects', JSON.stringify(subjectsArr));
      window.dispatchEvent(new Event("subjectsUpdated"));
    }

    setOpenMenu(null);
  };

  if (!subjects || subjects.length === 0){
    return(
      <div className="flex justify-center">
        <h1 className="mt-8 text-[#E0E1DD]">You currently have no courses. Start by adding one!</h1>
      </div>
      
    );
  }
  return (
    <>
      <div className="mt-8">
        <div className="flex items-center">
          <img src="/courses.svg" className="mr-4 w-7 h-7"/>
          <h1 className="text-[#E0E1DD] font-bold text-3xl">
            Courses
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {subjectList.map((subject, subjectId) => {
            const score = calcSubjectScore(subject);
            let bgColor = "bg-blue-400";

            if (score === -1) bgColor = "bg-gray-300";
            else if (score < 40) bgColor = "bg-red-400";
            else if (score < 70) bgColor = "bg-yellow-300";
            else bgColor = "bg-green-400";

            let scoreUI;
            if (score === -1) scoreUI = "No topics registered";
            else scoreUI = `${score} %`;

            return(
              <div key={subjectId} className="relative">
                <Link 
                  href={`/subject/${subjectId}`}
                  className={`p-4 bg-blue-400 rounded hover:opacity-80 transition-opacity duration-100 block ${bgColor}`}
                >
                  <div className="flex justify-between items-center">
                    <h1>{subject.name}</h1>
                    <button
                      className="text-black text-2xl px-2 opacity-20 hover:opacity-100 transition-opacity duration-100"
                      onClick={e => {
                        e.preventDefault();
                        setOpenMenu(openMenu === subjectId ? null : subjectId);
                      }}
                    >
                      &#x22EE; {/* Unicode for vertical ellipsis */}
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 font-semibold">
                    Proficiency: {scoreUI}
                  </div>
                </Link>
                {openMenu === subjectId && (
                  <div
                    ref={menuRef}
                    className="absolute right-4 top-12 bg-[#E0E1DD] rounded shadow-lg z-10 flex flex-col"
                  >
                    <button 
                      className="px-4 py-2 hover:bg-gray-300 transition-colors duration-150 text-left"
                      onClick={() => openEditModal(subjectId)}
                    >Edit</button>
                    <button 
                      className="px-4 py-2 hover:bg-gray-300 transition-colors duration-150 text-left text-red-600"
                      onClick={() => {
                        setDeletingId(subjectId);
                        setDeleteConfirmOpen(true);
                        setOpenMenu(null);
                      }}
                    >Delete</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div> 

      <AnimatePresence>
        {editModalOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          >
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#E0E1DD] p-6 rounded shadow-lg flex flex-col gap-4 min-w-[300px]">
                <h2 className="text-xl font-bold mb-2">Edit Subject Name</h2>
                <input
                  className="border p-2 rounded"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-[#E0E1DD] rounded"
                    onClick={handleEditSave}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-black rounded"
                    onClick={() => setEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence> 
        {deleteConfirmOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          >
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#E0E1DD] p-6 rounded shadow-lg flex flex-col gap-4 min-w-[300px]">
                <h2 className="text-xl font-bold mb-2 text-red-600">Confirm Delete</h2>
                <p>Are you sure you want to delete this subject?</p>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-red-500 text-[#E0E1DD] rounded"
                    onClick={() => {
                      if (deletingId !== null) handleDelete(deletingId);
                      setDeleteConfirmOpen(false);
                      setDeletingId(null);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-black rounded"
                    onClick={() => {
                      setDeleteConfirmOpen(false);
                      setDeletingId(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> 
    </>
    
  );
  
}

