import { StudySession } from "./studySession";

export class Topic {
  name: string;
  studySessions: StudySession[];

  constructor(name: string, studySessions: StudySession[]) {
    this.name = name;
    this.studySessions = studySessions;
  }
}

