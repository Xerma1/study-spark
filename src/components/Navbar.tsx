import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="top-0 left-0 h-screen w-52 bg-[#E0E1DD] p-8">
      <ul className="flex flex-col gap-6 list-none m-0 p-0">
        <li>
          <Link href="/" className="hover:text-blue-600">Home</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-blue-600">About</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}