'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Topic } from '@/data/topic';
import sortTopicsInLocalStorage from '@/utils/sortTopics';
import calcTopicScore from "@/utils/calcTopicScore";
import Link from 'next/link';
import clsx from 'clsx';

export default function RenderTopicCards({ topics, subjectName, refresh }: { topics: Topic[], subjectName: string, refresh: number }) {
  const params = useParams();
  const index = Number(params.subjectId);
  const [sortedTopics, setSortedTopics] = useState<Topic[]>([]);

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  useEffect(() => {
    const sorted = sortTopicsInLocalStorage(index) || [];
    setSortedTopics(sorted);
  }, [index, refresh]);

  if (sortedTopics.length === 0){
    return (
      <div className="mt-8 text-[#E0E1DD] flex justify-center">
        <h1>You currently have no topics. Start by adding some!</h1>
      </div>
    );
  }

  const openEditModal = (topicId: number) => {
    setEditingId(topicId);
    setEditValue(sortedTopics[topicId].name);
    setEditModalOpen(true);
    setOpenMenu(null);
  };

  const handleEditSave = () => {
    if (editingId === null) return;
    const updated = [...sortedTopics];
    updated[editingId] = { ...updated[editingId], name: editValue };
    setSortedTopics(updated);

    // Update localStorage
    const stored = localStorage.getItem('subjects');
    if (stored) {
      const subjectsArr = JSON.parse(stored);
      const subjectIndex = Number(params.subjectId);
      subjectsArr[subjectIndex].topics[editingId].name = editValue;
      localStorage.setItem('subjects', JSON.stringify(subjectsArr));
      window.dispatchEvent(new Event("subjectsUpdated"));
    }
    setEditModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (topicId: number) => {
  const updated = sortedTopics.filter((_, idx) => idx !== topicId);
  setSortedTopics(updated);

  // Remove from localStorage
  const stored = localStorage.getItem('subjects');
    if (stored) {
      const subjectsArr = JSON.parse(stored)
      const subjectIndex = Number(params.subjectId);
      subjectsArr[subjectIndex].topics.splice(topicId, 1);
      localStorage.setItem('subjects', JSON.stringify(subjectsArr));
      window.dispatchEvent(new Event("subjectsUpdated"));
    }
    setOpenMenu(null);
  };

  return (
    <>
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-[#E0E1DD]">Subject {'>'} {subjectName}</h1>
        <h1 className="text-xl text-[#E0E1DD] pl-7 mt-2">Topics:</h1>
        
        <div className="flex flex-col gap-4 m-4">
          {sortedTopics.map((topic, topicId) => {
            const score = calcTopicScore(topic);
            // Choose border color based on score
            let borderColor = "border-l-12 border-green-400";
            if (score <= 40) borderColor = "border-l-12 border-red-400";
            else if (score <= 70) borderColor = "border-l-12 border-yellow-300";

            return (
              <div key={topicId} className={`relative bg-gradient-to-r from-blue-100 to-purple-200 shadow-lg rounded-xl p-5 ${borderColor} transition hover:scale-[1.02] hover:shadow-xl`}>
                <Link
                  href={`/subject/${index}/${topicId}`}
                  className="block"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h1 className="text-lg font-semibold text-blue-900">{topic.name}</h1>
                    <button
                      className="text-gray-500 text-2xl px-2 opacity-40 hover:opacity-100 transition-opacity duration-100"
                      onClick={e => {
                        e.preventDefault();
                        setOpenMenu(openMenu === topicId ? null : topicId);
                      }}
                    >
                      &#x22EE;
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <span className={
                      "font-bold px-3 py-1 rounded-full text-sm " +
                      (score <= 40
                        ? "bg-red-100 text-red-600"
                        : score <= 70
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700")
                    }>
                      Proficiency: {score}%
                    </span>
                  </div>
                </Link>
                {openMenu === topicId && (
                  <div
                    ref={menuRef}
                    className="absolute right-4 top-12 bg-[#E0E1DD] rounded shadow-lg z-10 flex flex-col"
                  >
                    <button
                      className="px-4 py-2 hover:bg-gray-300 transition-colors duration-150 text-left"
                      onClick={() => openEditModal(topicId)}
                    >Edit</button>
                    <button
                      className="px-4 py-2 hover:bg-gray-300 transition-colors duration-150 text-left text-red-600"
                      onClick={() => {
                        setDeletingId(topicId);
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
                <h2 className="text-xl font-bold mb-2">Edit Topic Name</h2>
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
                <p>Are you sure you want to delete this topic?</p>
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