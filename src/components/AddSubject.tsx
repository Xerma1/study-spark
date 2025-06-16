'use client';

import { useState } from 'react';

export default function AddSubject() {
  const [count, setCount] = useState(0);

  return (
    <button
      className="block bg-[#415A77] hover:bg-[#E0E1DD] hover:text-[#0D1B2A]
       text-white px-4 py-2 rounded w-full cursor-pointer"
      onClick={() => setCount(count + 1)}
    >
        
      Add subject/course + Clicked {count} times
    </button>
  );
}