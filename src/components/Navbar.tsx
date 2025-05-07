import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-navy text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl">Crew Lounge</span>
      </div>
      <div className="flex gap-6 items-center text-base">
        <a href="/" className="hover:text-orange">Home</a>
        <a href="/layovers" className="hover:text-orange">Layovers</a>
        <a href="/properties" className="hover:text-orange">Properties</a>
        <a href="/gigs" className="hover:text-orange">Gigs</a>
        <a href="/admin" className="hover:text-orange">Admin</a>
      </div>
      <div className="flex gap-3 items-center">
        <button className="bg-orange text-white px-4 py-2 rounded hover:bg-pink transition">Join the Community</button>
      </div>
    </nav>
  );
};

export default Navbar;
