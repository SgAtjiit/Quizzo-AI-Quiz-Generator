import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import QuizForm from "./components/QuizForm";
import ScoreCard from "./components/ScoreCard";
import QuizQuestions from "./components/QuizQuestions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            padding: "6px 10px",
            fontSize: "13px",
            background: "white",
            color: "black",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          },
        }}
      />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizForm" element={<QuizForm />} />
          <Route path="/quiz" element={<QuizQuestions />} />
          <Route path="/score" element={<ScoreCard />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
