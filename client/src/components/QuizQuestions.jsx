import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import genAI from "../utils/gemini";
import { toast } from "react-hot-toast";

const QuizQuestions = () => {
  const location = useLocation();
  const { topic, noq, time } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(time * 60);
  const [userAnswers, setUserAnswers] = useState([]);

  const navigate = useNavigate();

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const parseQuestionsWithOptions = (rawText) => {
    const lines = rawText.split("\n").filter((line) => line.trim() !== "");
    const questions = [];
    const options = [];
    const answers = [];

    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].startsWith("(a)")) {
        questions.push(lines[i]);
        options.push([
          lines[i + 1]?.replace(/^\(a\)\s*/, "") || "",
          lines[i + 2]?.replace(/^\(b\)\s*/, "") || "",
          lines[i + 3]?.replace(/^\(c\)\s*/, "") || "",
          lines[i + 4]?.replace(/^\(d\)\s*/, "") || "",
        ]);
        const answerLine = lines[i + 5] || "";
        const match = answerLine.match(/Answer:\s*([a-d])/i);
        answers.push(match ? match[1].toLowerCase() : null);
        i += 5;
      }
    }

    return { questions, options, answers };
  };

  const generateBatch = async () => {
    const prompt = `You are a quizmaster. Generate 5 unique and random multiple-choice quiz questions on the topic: "${topic}".\n\nFor each question:\n- Give a one-line question\n- Followed by exactly 4 options labeled (a), (b), (c), (d)\n- Mention the correct option label (a/b/c/d) in the last line as: "Answer: b"\n\n⚠️ Rules:\n- Do NOT include numbering like "Question 1"\n- Do NOT include explanations\n- Separate each question block by one blank line`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const res = await (await model.generateContent([prompt])).response;
      const text = await res.text();

      const {
        questions: newQs,
        options: newOptions,
        answers: newAns,
      } = parseQuestionsWithOptions(text);

      setQuestions((prev) => [...prev, ...newQs]);
      setOptions((prev) => [...prev, ...newOptions]);
      setAnswers((prev) => [...prev, ...newAns]);
    } catch (err) {
      console.error("Error generating batch:", err);
      alert("Error occurred while generating questions");
    }
  };

  const generateQuestions = async () => {
    setQuestions([]);
    setOptions([]);
    setAnswers([]);
    setLoading(true);

    const batches = Math.ceil(noq / 5);
    for (let i = 0; i < batches; i++) {
      await generateBatch();
      await new Promise((res) => setTimeout(res, 1000));
    }

    setLoading(false);
    toast("Your Quiz is Ready!!");
  };

  const handleSubmit = () => {
    const confirmed = window.confirm(
      `You have attempted ${
        userAnswers.filter((a) => a !== undefined).length
      }! Are you sure you want to submit your answers?`
    );
    if (confirmed) {
      let finalScore = 0;
      for (let i = 0; i < answers.length; i++) {
        if (userAnswers[i] && userAnswers[i] === answers[i]) {
          finalScore++;
        }
      }
      toast(" Quiz submitted successfully!");
      // navigate(/score, {
      //   state: {
      //     questions: questions,
      //     options: options,
      //     answers: answers,
      //     userAnswers: userAnswers,
      //   },
      // });
      navigate(`/score`, {
        state: {
          score: finalScore,
          q: questions.length,
          attempted: userAnswers.length,
        },
      });
    }
  };
  useEffect(() => {
    if (!topic || !noq || !time) {
      toast("Don't try to be oversmart!! You will not get Anything Here");
      navigate("/quizForm");
    }
  });
  useEffect(() => {
    generateQuestions();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            let finalScore = 0;
            for (let i = 0; i < answers.length; i++) {
              if (userAnswers[i] && userAnswers[i] === answers[i]) {
                finalScore++;
              }
            }
            toast(" Time's up! Submitting your quiz...", { icon: "⏳" });
            setTimeout(() => {
              navigate(`/score`, {
                state: {
                  score: finalScore,
                  q: questions.length,
                  attempted: userAnswers.length,
                },
              });
            }, 2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, answers, userAnswers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-purple-400">Your Quiz</h1>
          <span className="text-xl text-red-400 font-semibold">
            ⏳ Time Left: {formatTime()}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-purple-300">
          Topic: {topic}
        </h2>
        <h3 className="text-md mb-6 text-gray-300">Total Questions: {noq}</h3>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-500"></div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <Card
                  key={index}
                  question={q}
                  options={options[index] || []}
                  answer={answers[index]}
                  qNo={index + 1}
                  onAnswer={(ans) => {
                    const copy = [...userAnswers];
                    copy[index] = ans;
                    setUserAnswers(copy);
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded transition-all duration-300 transform hover:scale-105"
            >
              Submit Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizQuestions;
