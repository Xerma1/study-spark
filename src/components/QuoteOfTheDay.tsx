'use client';

import { useEffect, useState } from "react";

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    fetch('/api/quote')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data[0]) {
          setQuote(`${data[0].q} — ${data[0].a}`);
        }
      })
      .catch(() => setQuote("Stay motivated and keep learning!"));
  }, []);

  return (
    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-200 to-blue-100 shadow text-center">
      <span className="block text-lg font-semibold text-purple-900 mb-1">Quote of the Day</span>
      <span className="italic text-purple-800">{quote}</span>
    </div>
  );
}