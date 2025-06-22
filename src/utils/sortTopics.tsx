import { Topic } from "@/data/topic";

export default function sortTopicsInLocalStorage(subjectIndex: number) {
    const stored = localStorage.getItem('subjects');
    if (!stored) return;

    const subjects = JSON.parse(stored);
    if (!subjects[subjectIndex] || !Array.isArray(subjects[subjectIndex].topics)) return;

    subjects[subjectIndex].topics.sort((a: Topic, b: Topic) => (a.score ?? 0) - (b.score ?? 0));
    localStorage.setItem('subjects', JSON.stringify(subjects));
    
    return (subjects[subjectIndex].topics);
}