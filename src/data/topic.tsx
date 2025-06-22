import { StudySession } from "./studySession";

export class Topic {
  name: string;
  studySessions: StudySession[];
  score: number;

  constructor(name: string, studySessions: StudySession[], score: number) {
    this.name = name;
    this.studySessions = studySessions;
    this.score = score;
  }
}

