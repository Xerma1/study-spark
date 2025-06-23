import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 h-screen w-50 bg-gradient-to-b from-[#b8c6db] via-[#e0e1dd] to-[#a9bcd0] shadow-xl flex flex-col items-center py-8 z-50">
      <div className="mb-10 flex items-center gap-2">
        <svg className="w-7 h-7 text-yellow-400 drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <g stroke="currentColor" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
            <line x1="5" y1="5" x2="8" y2="8" />
            <line x1="16" y1="16" x2="19" y2="19" />
            <line x1="5" y1="19" x2="8" y2="16" />
            <line x1="16" y1="8" x2="19" y2="5" />
          </g>
        </svg>
        <span className="text-xl font-bold text-blue-900 tracking-wide">StudySpark</span>
      </div>
      <ul className="flex flex-col gap-4 w-full">
        <li>
          <Link
            href="/"
            className="block px-4 py-2 rounded-lg text-base font-medium text-blue-900 hover:bg-blue-100 hover:text-blue-700 transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="block px-4 py-2 rounded-lg text-base font-medium text-blue-900 hover:bg-blue-100 hover:text-blue-700 transition"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}