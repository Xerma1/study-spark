import { StudySession } from "./studySession";
import { Topic } from "./topic";

export class Subject {
  name: string;
  topics: Topic[];

  constructor(name: string, topics: Topic[]) {
		this.name = name;
		this.topics = topics;
  }
}

// Base data to play around with
export const Subjects: Subject[] = [
	new Subject("Intro to computing: SC1007",[
		new Topic('Data types', [
			new StudySession('Low', '6/1/2025'),
			new StudySession('Mid', '6/3/2025'),
			new StudySession('High', '6/18/2025')
		]),
		new Topic('Python syntax',[]),
		new Topic('For loops',[]),
		new Topic('While loops',[])
	]),
	new Subject("Discrete maths: MH1812",[]),
	new Subject("Comp architecture: SC1006",[]),
	new Subject("Physics 101: PH1011",[]),
]

