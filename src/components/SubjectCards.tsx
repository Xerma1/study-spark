import { Subjects } from "@/data/subjects";
import Link from 'next/link';

export default function SubjectCards() {

  return (
    <div className="mt-8">
      <h1 className=" text-white ">
        Number of Subjects = {Subjects.length}
      </h1>
      
      <Link href="https://www.youtube.com/">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {Subjects.map((subject, index) => (
            <div key={index} className="p-4 bg-blue-400 rounded">
              <h1>{subject.name}: {subject.code}</h1>
            </div>
          ))}
        </div>
      </Link>
    </div>
    
  );
}