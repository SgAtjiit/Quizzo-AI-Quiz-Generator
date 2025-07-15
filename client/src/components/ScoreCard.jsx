import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ScoreCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, q, attempted } = location.state || {};
  const correct = parseInt(score);
  const total = parseInt(q);
  const tried = parseInt(attempted);
  const incorrect = tried - correct;
  const unattempted = total - tried;

  const data = [
    { name: "Correct", value: correct },
    { name: "Incorrect", value: incorrect },
    { name: "Unattempted", value: unattempted },
  ];

  const COLORS = ["#34d399", "#f87171", "#facc15"]; // green, red, yellow

  const handleSubmit = () => {
    navigate("/quizForm");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="bg-black bg-opacity-70 p-8 sm:p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-purple-400 animate-pulse">
          🎉 Quiz Completed!
        </h1>

        <p className="text-lg sm:text-xl mb-6">
          You scored <span className="font-bold text-green-400">{correct}</span>{" "}
          out of <span className="font-bold text-yellow-300">{total}</span>
        </p>

        {/* Score Pie Chart */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
        >
          🔁 Generate More Quizzes
        </button>
      </div>
    </div>
  );
};

export default ScoreCard;
