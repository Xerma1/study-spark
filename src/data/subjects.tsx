export class Subject {
  name: string;

  constructor(name: string) {
		this.name = name;
  }
}

// Base data to play around with
export const Subjects: Subject[] = [
	new Subject("Intro to computing: SC1007"),
	new Subject("Discrete maths: MH1812"),
	new Subject("Comp architecture: SC1006"),
	new Subject("Physics 101: PH1011"),
]

