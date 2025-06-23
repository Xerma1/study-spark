import { StudySession } from '@/data/studySession';
import { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import clsx from 'clsx';
import calcTopicScore from '@/utils/calcTopicScore';

export default function RenderStudySeshCards({
  sessions,
  subjectName,
  topicName,
  subjectIndex,
  topicIndex,
}: {
  sessions: StudySession[];
  subjectName: string;
  topicName: string;
  subjectIndex: number;
  topicIndex: number;
}) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editValue, setEditValue] = useState<{ levelOfConfidence: string; date: Date}>({
    levelOfConfidence: '',
    date: new Date,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [sessionList, setSessionList] = useState<StudySession[]>(sessions);

  useEffect(() => {
    setSessionList(sessions);
  }, [sessions]);

  // Close menu when clicking outside
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

  // Edit handlers
  const openEditModal = (sessionId: number) => {
    setEditingId(sessionId);
    setEditValue({
      levelOfConfidence: sessionList[sessionId].levelOfConfidence,
      date: new Date(sessionList[sessionId].date),
    });
    setEditModalOpen(true);
    setOpenMenu(null);
  };

  const handleEditSave = () => {
    if (editingId === null) return;
    const updated = [...sessionList];
    updated[editingId] = { 
      ...updated[editingId], 
      levelOfConfidence: editValue.levelOfConfidence, 
      date: editValue.date.toDateString()
    };
    setSessionList(updated);

    // Update localStorage
    const stored = localStorage.getItem('subjects');
    if (stored) {
      const subjectsArr = JSON.parse(stored);
      subjectsArr[subjectIndex].topics[topicIndex].studySessions[editingId] = { 
        ...updated[editingId] };

      // If editing the last session, recalculate score
      if (editingId === updated.length - 1) {
        // Create a temp topic object with updated sessions
        const tempTopic = {
          ...subjectsArr[subjectIndex].topics[topicIndex],
          studySessions: updated,
        };
        const newScore = calcTopicScore(tempTopic);
        subjectsArr[subjectIndex].topics[topicIndex].score = newScore;
      }

      localStorage.setItem('subjects', JSON.stringify(subjectsArr));
    }

    setEditModalOpen(false);
    setEditingId(null);
  };

  // Delete handlers
  const handleDelete = (sessionId: number) => {
    const updated = sessionList.filter((_, idx) => idx !== sessionId);
    setSessionList(updated);

    // Update localStorage
    const stored = localStorage.getItem('subjects');
    if (stored) {
      const subjectsArr = JSON.parse(stored);
      subjectsArr[subjectIndex].topics[topicIndex].studySessions.splice(sessionId, 1);
      localStorage.setItem('subjects', JSON.stringify(subjectsArr));
    }

    setDeleteConfirmOpen(false);
    setDeletingId(null);
    setOpenMenu(null);
  };

  if (sessionList.length === 0) {
    return (
      <div className="m-8">
        <h1 className="text-3xl font-bold text-[#E0E1DD] mb-4">{subjectName}</h1>
        <h1 className="text-2xl font-bold text-[#E0E1DD]">Topic {'>'} {topicName}</h1>
        <h1 className="flex justify-center text-300 text-white mt-20">
          You have currently no study sessions, lets get started with our first one!
        </h1>
      </div>
    );
  }

  return (
    <div className="m-8">
      <h1 className="text-3xl font-bold text-[#E0E1DD] mb-4">{subjectName}</h1>
      <h1 className="text-2xl font-bold text-[#E0E1DD]">Topic {'>'} {topicName}</h1>
      <div className="flex items-center">
        <img src="/study.svg" className="mt-1 -mr-4 w-7 h-7" />
        <h1 className="text-xl text-[#E0E1DD] pl-7 pt-4">Showing past study sessions:</h1>
      </div>

      <div className="flex flex-col gap-4 m-4">
        {sessionList.map((session, sessionId) => {
          const isMenuOpen = openMenu === sessionId;
          return (
            <div
              key={sessionId}
              className={clsx(
                'p-4 rounded',
                {
                  'relative': isMenuOpen,
                  'bg-red-400': session.levelOfConfidence === 'Low',
                  'bg-yellow-300': session.levelOfConfidence === 'Medium',
                  'bg-green-400': session.levelOfConfidence === 'High',
                }
              )}
            >
              <div className="flex justify-between items-center">
                <h1 className="text-black">
                  {session.levelOfConfidence}, {session.date}
                </h1>
                <button
                  aria-label="Open menu"
                  className="text-black text-2xl px-2 opacity-20 hover:opacity-100 transition-opacity duration-100"
                  onClick={e => {
                    e.preventDefault();
                    setOpenMenu(isMenuOpen ? null : sessionId);
                  }}
                >
                  &#x22EE;
                </button>
              </div>

              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-4 top-12 bg-white rounded shadow-lg z-50 flex flex-col"
                  style={{ pointerEvents: 'auto' }}
                >
                  <button
                    className="px-4 py-2 hover:bg-gray-300 transition-colors duration-150 text-left"
                    onClick={() => openEditModal(sessionId)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 hover:bg-gray-300 transition-colors duration-150 text-left text-red-600"
                    onClick={() => {
                      setDeletingId(sessionId);
                      setDeleteConfirmOpen(true);
                      setOpenMenu(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col gap-4 min-w-[300px]">
            <h2 className="text-xl font-bold mb-2">Edit Study Session</h2>
            <select
              className="border p-2 rounded"
              value={editValue.levelOfConfidence}
              onChange={e => setEditValue(v => ({ ...v, levelOfConfidence: e.target.value }))}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <Calendar
              onChange={date => setEditValue(v => ({ ...v, date: date as Date }))}
              value={editValue.date}
            />
            <p className="text-black mt-2">Selected date: {editValue.date.toDateString()}</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
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
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col gap-4 min-w-[300px]">
            <h2 className="text-xl font-bold mb-2 text-red-600">Confirm Delete</h2>
            <p>Are you sure you want to delete this study session?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => {
                  if (deletingId !== null) handleDelete(deletingId);
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
      )}
    </div>
  );
}