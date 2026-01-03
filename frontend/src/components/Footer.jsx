import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#240750] text-white mt-16">
      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* Top Section */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 text-center md:text-left">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-[#57A6A1]">LAD</h2>
            <p className="text-sm text-gray-300 mt-3 leading-relaxed">
              Play free online games anytime.  
              Enjoy action, arcade, racing, and casual games.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[#57A6A1] mb-3">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/about" className="hover:text-[#57A6A1]">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#57A6A1]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-[#57A6A1] mb-3">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/privacy-policy" className="hover:text-[#57A6A1]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#57A6A1]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-[#57A6A1]">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#577B8D] mt-8 pt-5 text-center md:flex md:items-center md:justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} LAD Games. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Games powered by third-party providers
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
