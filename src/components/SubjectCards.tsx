'use client';

import { useState, useEffect } from "react";
import { Subject, Subjects as BaseSubjects} from "@/data/subjects";
import Link from 'next/link';

export default function renderSubjectCards({ subjects }: { subjects: Subject[] }) {

  return (
    <div className="mt-8">
      <h1 className=" text-white font-bold text-3xl">
        Courses = {subjects.length}
      </h1>
      
      <Link href="https://media.tenor.com/ZlZZTd366EYAAAAe/we-have-no-sappers-dog-accepting-fate.png">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {subjects.map((subject, index) => (
            <div key={index} className="p-4 bg-blue-400 rounded hover:opacity-80">
              <h1>{subject.name}</h1>
            </div>
          ))}
        </div>
      </Link>
    </div>
    
  );
}