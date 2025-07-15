import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center leading-snug">
        Welcome to <span className="text-purple-400">Quizzo</span>
      </h1>

      <p className="text-lg sm:text-xl text-gray-300 max-w-3xl text-center mb-12 leading-relaxed">
        <strong className="text-purple-300">Quizzo</strong> is an{" "}
        <strong className="text-purple-300">AI-powered Quiz Generator</strong>{" "}
        that creates unique quizzes based on your chosen topic. Whether you're a
        student, teacher, or curious learner — Quizzo helps you learn smarter
        and faster!
      </p>

      <ul className="text-gray-300 text-base sm:text-lg space-y-4 mb-16 max-w-xl w-full px-6 sm:px-0 leading-relaxed">
        <li>✨ Instantly generate topic-based quizzes</li>
        <li>🤖 AI-crafted questions & answers</li>
        <li>📊 Visual score summary with pie chart</li>
        <li>🟡 Tracks correct, incorrect, and unattempted questions</li>
        <li>⏱️ Auto-redirects after completion</li>
        <li>⏳ Built-in timer for a real test-like environment</li>
        <li>📱 Fully responsive, fast and intuitive UI</li>
        <li>🚀 No login required – just start and learn!</li>
      </ul>

      <button
        onClick={() => navigate("/quizForm")}
        className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 
        text-white font-semibold py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform p-3 hover:scale-105"
      >
        Generate a Quiz
      </button>
    </div>
  );
};

export default Home;
