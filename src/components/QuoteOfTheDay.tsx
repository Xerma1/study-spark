'use client';

import { useEffect, useState } from "react";

function getTodayString() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    const today = getTodayString();
    const cachedQuote = localStorage.getItem("quoteOfTheDay");
    const cachedDate = localStorage.getItem("quoteOfTheDayDate");

    if (cachedQuote && cachedDate === today) {
      setQuote(cachedQuote);
    } else {
      fetch('/api/quote')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data[0]) {
            const newQuote = `${data[0].q} — ${data[0].a}`;
            setQuote(newQuote);
            localStorage.setItem("quoteOfTheDay", newQuote);
            localStorage.setItem("quoteOfTheDayDate", today);
          }
        })
        .catch(() => setQuote("Stay motivated and keep learning!"));
    }
  }, []);

  return (
    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-200 to-blue-100 shadow text-center">
      <span className="block text-lg font-semibold text-purple-900 mb-1">Quote of the Day</span>
      <span className="italic text-purple-800">{quote}</span>
    </div>
  );
}