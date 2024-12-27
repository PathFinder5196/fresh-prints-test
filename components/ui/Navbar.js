// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-end p-4 bg-gray-100">
      <div className="flex space-x-4">
        <Link href="/" className="">
          Home
        </Link>
        <Link href="/history">History</Link>
      </div>
    </nav>
  );
}
