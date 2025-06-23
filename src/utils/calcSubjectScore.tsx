import { Subject } from "@/data/subjects";
import { Topic } from "@/data/topic";

export default function calcSubjectScore(subject: Subject) {
  if (!subject.topics || subject.topics.length === 0) return 0;
  const totalScore = subject.topics.reduce((sum, topic) => sum + (topic.score || 0), 0);
  const maxScore = subject.topics.length * 100;
  return Math.round((totalScore / maxScore) * 100); // returns percentage (0-100)
}