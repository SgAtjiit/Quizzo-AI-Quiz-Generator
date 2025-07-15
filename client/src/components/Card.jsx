import React, { useState } from "react";

const Card = ({ question, options, answer, qNo, onAnswer }) => {
  const [userAns, setUserAns] = useState("");

  const handleChange = (val) => {
    setUserAns(val);
    onAnswer(val);
  };

  return (
    <div className="border border-gray-700 rounded-xl p-6 mb-6 shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <p className="font-semibold mb-4 text-lg text-purple-400">
        Q{qNo}. {question}
      </p>
      <ul className="space-y-3">
        {options.map((opt, i) => {
          const val = String.fromCharCode(97 + i);
          const isSelected = userAns === val;
          const isCorrect = val === answer;

          return (
            <li key={i}>
              <label
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? isCorrect
                      ? "bg-green-800/50 border border-green-400"
                      : "bg-red-800/40 border border-red-400"
                    : "bg-gray-700/40 hover:bg-gray-600/40"
                }`}
              >
                <input
                  type="radio"
                  name={`q${qNo}`}
                  value={val}
                  onChange={() => handleChange(val)}
                  checked={isSelected}
                  className="form-radio h-4 w-4 text-blue-500 accent-blue-600"
                />
                <span className="text-sm sm:text-base">{opt}</span>
              </label>
            </li>
          );
        })}
      </ul>

      {userAns === answer && (
        <p className="text-green-400 mt-4 font-medium">✅ Correct answer!</p>
      )}

      {userAns !== answer && userAns !== "" && (
        <p className="text-red-400 mt-4 font-medium">
          ❌ Incorrect. Correct answer was{" "}
          <span className="underline">{answer.toUpperCase()}</span>
        </p>
      )}
    </div>
  );
};

export default Card;
