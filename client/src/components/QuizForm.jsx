import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const QuizForm = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({ topic: "", noq: "", time: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { topic, noq, time } = formData;

    if (!topic || !noq) {
      toast(" Please fill all fields.");
      return;
    }

    if (noq < 5 || noq % 5 !== 0) {
      toast(" Number of Questions must be a multiple of 5 (min 5).");
      return;
    }

    if (noq > 50) {
      toast(" Please enter less than 50 questions.");
      return;
    }

    toast(" Quiz is being generated!");
    navigate("/quiz", {
      state: { topic, noq, time },
    });

    setFormData({ topic: "", noq: "", time: "" });
  };
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div
      ref={formRef}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    >
      <p className="mb-8 text-center text-lg sm:text-lg text-gray-300 leading-relaxed mt-[-10px]">
        <span className="text-white font-semibold text-5xl">
          Welcome to Quizzo
        </span>{" "}
        <br />
        Create a custom quiz by entering a topic,choosing number of
        questions and time required to complete the quiz
        <br />
        <span className="text-base text-purple-400">
          (only multiples of 5 allowed)
        </span>
      </p>

      <div className="bg-[#1f2937] w-full max-w-md p-10 rounded-3xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-200 tracking-wide">
          🎯 Generate Your Quiz
        </h2>

        <div className="mb-5">
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Enter quiz topic"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6">
          <input
            type="number"
            name="noq"
            value={formData.noq}
            onChange={handleChange}
            placeholder="Enter no. of questions"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="number"
            placeholder="Time in minutes"
            name="time"
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="w-full px-4 py-3 mb-6 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-3 rounded-full transition-transform duration-300 transform hover:scale-105"
        >
          🚀 Generate Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizForm;
