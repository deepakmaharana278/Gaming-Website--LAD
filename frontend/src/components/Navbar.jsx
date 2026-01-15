import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const handleSearch = () => {
    navigate(`/all-games?search=${search}&category=${category}`);
  };
  const navigate = useNavigate();

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games/`)
      .then((res) => res.json())
      .then((data) => {
        const unique = [...new Set(data.map((g) => g.category).filter(Boolean))];
        setCategories(unique);
      });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-[#240750] text-white px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-wide text-[#57A6A1]">
          <img src={logo} alt="LAD Logo" className="h-9 w-9 object-contain" />
          <span>LAD</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-[#57A6A1]">
            Home
          </Link>
          <Link to="/trending" className="hover:text-[#57A6A1]">
            Trending
          </Link>
          <Link to="/all-games" className="hover:text-[#57A6A1]">
            All Games
          </Link>

          <select
            value={category}
            onChange={(e) => {
              const value = e.target.value;
              setCategory(value);
              navigate(`/all-games?search=${search}&category=${value}`);
            }}
            className="bg-[#344C64] border border-[#577B8D] px-3 py-1.5 rounded-md"
          >
            <option value="All">All</option>

            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="relative w-56">
            <input
              type="search"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="w-full px-3 py-2 rounded-md bg-[#344C64] border border-[#577B8D]"
            />
            <button onClick={handleSearch} className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#57A6A1] text-[#240750] px-3 py-1 rounded-md font-semibold">
              Go
            </button>
          </div>
        </div>

        {/* Auth / Profile / Mobile Button */}
        <div className="flex items-center gap-3 text-sm">
          {/* Logged OUT */}
          {!user && (
            <>
              <Link to="/login" className="hover:text-[#57A6A1]">
                Login
              </Link>
              <Link to="/signup" className="bg-[#57A6A1] text-[#240750] px-3 py-1.5 rounded-md font-semibold">
                Signup
              </Link>
            </>
          )}

          {/* Logged IN */}
          {user && (
            <div className="flex items-center gap-3">
              {/* Logout Button (LEFT) */}
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md font-semibold">
                Logout
              </button>

              {/* Username + Profile Pic (RIGHTMOST) */}
              <div className="flex items-center gap-2 bg-[#344C64] px-3 py-1.5 rounded-full">
                <span className="hidden sm:block text-xs font-medium truncate max-w-30">{user.displayName || "Player"}</span>
                <img src={user.photoURL || "https://i.pravatar.cc/40"} alt="Profile" className="h-8 w-8 rounded-full object-cover border border-[#57A6A1]" />
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl ml-2" onClick={() => setOpen(!open)}>
            <i className={`fas ${open ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-[#1b133f] rounded-xl p-4 space-y-5 text-sm">
          {/* Search */}
          <div className="flex gap-2">
            <input
              type="search"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 px-3 py-2 rounded-md bg-[#344C64] border border-[#577B8D]"
            />
            <button onClick={handleSearch} className="bg-[#57A6A1] text-[#240750] px-4 rounded-md font-semibold">
              Go
            </button>
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => {
              const value = e.target.value;
              setCategory(value);
              setOpen(false);
              navigate(`/all-games?search=${search}&category=${value}`);
            }}
            className="w-full bg-[#344C64] border border-[#577B8D] px-3 py-2 rounded-md"
          >
            <option value="All">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Navigation */}
          <div className="space-y-3 border-t text-center border-white/10 pt-3">
            <Link to="/" onClick={() => setOpen(false)} className="block hover:text-[#57A6A1]">
              Home
            </Link>
            <Link to="/trending" onClick={() => setOpen(false)} className="block hover:text-[#57A6A1]">
              Trending
            </Link>
            <Link to="/all-games" onClick={() => setOpen(false)} className="block hover:text-[#57A6A1]">
              All Games
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
