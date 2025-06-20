import { StudySession } from "./studySession";
import { Topic } from "./topic";

export class Subject {
  name: string;
  score: number;
  topics: Topic[];
  

  constructor(name: string, score: number, topics: Topic[]) {
		this.name = name;
		this.score = score;
		this.topics = topics;
		
  }
}

// Base data to play around with
export const Subjects: Subject[] = [
	new Subject("Intro to computing: SC1007", 80, [
		new Topic('Data types', [
			new StudySession('Low', 'Mon Jun 2 2025'),
			new StudySession('Medium', 'Thu Jun 5 2025'),
			new StudySession('High', 'Thu Jun 12 2025')
		]),
		new Topic('Python syntax',[]),
		new Topic('For loops',[]),
		new Topic('While loops',[])
	]),
	new Subject("Discrete maths: MH1812", 0,[]),
	new Subject("Comp architecture: SC1006", 0,[]),
	new Subject("Physics 101: PH1011", 0,[]),
]

