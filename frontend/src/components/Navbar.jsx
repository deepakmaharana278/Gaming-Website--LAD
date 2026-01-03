import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#240750] text-white px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-[#57A6A1]">
          LAD
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-[#57A6A1]">Home</Link>
          <Link to="/trending" className="hover:text-[#57A6A1]">Trending</Link>
          <Link to="/all-games" className="hover:text-[#57A6A1]">All Games</Link>

          <select className="bg-[#344C64] border border-[#577B8D] px-3 py-1.5 rounded-md">
            <option value="">Category</option>
            <option value="action">Action</option>
            <option value="arcade">Arcade</option>
            <option value="racing">Racing</option>
            <option value="casual">Casual</option>
          </select>

          <div className="relative w-56">
            <input
              type="search"
              placeholder="Search games..."
              className="w-full px-3 py-2 rounded-md bg-[#344C64] border border-[#577B8D]"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#57A6A1] text-[#240750] px-3 py-1 rounded-md font-semibold">
              Go
            </button>
          </div>
        </div>

        {/* Auth + Mobile Button */}
        <div className="flex items-center gap-3 text-sm">
          <Link to="/login" className="hover:text-[#57A6A1]">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[#57A6A1] text-[#240750] px-3 py-1.5 rounded-md font-semibold"
          >
            Signup
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl ml-2"
            onClick={() => setOpen(!open)}
          >
            <i className={`fas ${open ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 space-y-4 px-2 text-sm">

          <Link to="/" className="block" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/trending" className="block" onClick={() => setOpen(false)}>Trending</Link>
          <Link to="/all-games" className="block" onClick={() => setOpen(false)}>All Games</Link>

          <select className="w-full bg-[#344C64] border border-[#577B8D] px-3 py-2 rounded-md">
            <option value="">Category</option>
            <option value="action">Action</option>
            <option value="arcade">Arcade</option>
            <option value="racing">Racing</option>
            <option value="casual">Casual</option>
          </select>

          <div className="relative">
            <input
              type="search"
              placeholder="Search games..."
              className="w-full px-3 py-2 rounded-md bg-[#344C64] border border-[#577B8D]"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#57A6A1] text-[#240750] px-3 py-1 rounded-md font-semibold">
              Go
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
