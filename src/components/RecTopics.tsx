import { useEffect, useState } from "react";
import { Subject } from "@/data/subjects";
import Link from "next/link";

type TopicWithSubject = {
  name: string;
  score: number;
  subjectName: string;
  subjectId: number;
  topicId: number;
};

function getLowestTopics(): TopicWithSubject[] {
  const stored = localStorage.getItem("subjects");
  if (!stored) return [];
  const subjectsArr: Subject[] = JSON.parse(stored);
  const allTopics: TopicWithSubject[] = subjectsArr
    .flatMap((subject, subjectIdx) =>
      (subject.topics || []).map((topic, topicIdx) => ({
        name: topic.name,
        score: topic.score ?? 0,
        subjectName: subject.name || "Unknown Subject",
        subjectId: subjectIdx,
        topicId: topicIdx,
      }))
    );
  return allTopics
    .filter(topic => topic.score <= 70)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
}

export default function RecommendTopics() {
  const [lowestTopics, setLowestTopics] = useState<TopicWithSubject[]>([]);

  // Refresh logic
  useEffect(() => {
    setLowestTopics(getLowestTopics());

    // Listen for localStorage changes (other tabs/windows)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "subjects") {
        setLowestTopics(getLowestTopics());
      }
    };
    window.addEventListener("storage", handleStorage);

    // Listen for custom event in this tab
    const handleCustom = () => setLowestTopics(getLowestTopics());
    window.addEventListener("subjectsUpdated", handleCustom);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("subjectsUpdated", handleCustom);
    };
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg mb-8 border border-blue-200 max-w-3xl ml-8">
      <h2 className="text-xl font-bold mb-4 text-blue-900 flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Top 3 Topics to Focus On
      </h2>
      {lowestTopics.length === 0 ? (
        <p className="text-gray-500">Congratulations, you have no topics that require your attention! 🎉</p>
      ) : (
        <ul className="space-y-3">
          {lowestTopics.map((topic, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3 border border-blue-100 hover:shadow-md transition"
            >
              <div>
                <Link
                  href={`/subject/${topic.subjectId}/${topic.topicId}`}
                  className="font-semibold text-blue-700 hover:underline text-base"
                >
                  {topic.name}
                </Link>
                <span className="ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                  in {topic.subjectName}
                </span>
              </div>
              <span
                className={
                  "font-bold text-base " +
                  (topic.score <= 40
                    ? "text-red-500"
                    : topic.score <= 70
                    ? "text-yellow-500"
                    : "text-green-600")
                }
              >
                Proficiency: {topic.score ?? 0}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}