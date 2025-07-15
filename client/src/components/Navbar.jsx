import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center py-6 bg-gradient-to-r from-gray-900 to-gray-800 border-0 ">
      <nav className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] bg-[#1f2937] text-white px-8 py-6 rounded-3xl shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img src="./logo.png" alt="Quizzo Logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold tracking-wider text-purple-300">
              Quizzo
            </span>
          </Link>

          <div className="flex gap-8 text-lg">
            <Link
              to="/"
              className="hover:text-purple-400 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/quizForm"
              className="hover:text-purple-400 transition duration-300"
            >
              Quiz
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
