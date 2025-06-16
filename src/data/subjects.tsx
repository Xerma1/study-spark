export class Subject {
  name: string;
  code: string;

  constructor(name: string, code: string) {
		this.name = name;
		this.code = code;
  }
}

export const Subjects: Subject[] = [
	new Subject("Intro to computing", "SC1007"),
	new Subject("Discrete maths", "MH1812"),
	new Subject("Comp architecture", "SC1006"),
	new Subject("Physics 101", "PH1011"),
]