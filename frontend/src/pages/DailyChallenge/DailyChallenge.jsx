import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const noChallenges = [
  {
    id: 1,
    title: "No Challenge Available",
    date: new Date().toISOString().slice(0, 10),
    content: "No Challenges available",
  },
];

function DailyChallenge() {
  const [selectedChallenge, setSelectedChallenge] = useState(noChallenges[0]);
  const [userInput, setUserInput] = useState("");
  const [allChallenges, setAllChallenges] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchSubmissionStatus = async (challengeId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/dailyChallenge/submission/${challengeId}`,
        { withCredentials: true }
      );

      if (response.data.submitted) {
        setIsSubmitted(true);
        setUserInput(response.data.submission.solution || "");
      } else {
        setIsSubmitted(false);
        setUserInput("");
      }
    } catch (err) {
      console.error("Error checking submission:", err);
    }
  };

  const fetchChallenges = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/dailyChallenge/get_all_daily_challenges`);
      if (!response.data.success) return;

      const challenges = response.data.challenges;
      const latest = challenges[challenges.length - 1];

      setAllChallenges(challenges);
      setSelectedChallenge(latest);
      fetchSubmissionStatus(latest._id);
    } catch (error) {
      console.error("Error fetching challenges:", error);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    fetchSubmissionStatus(challenge._id);
  };

  const handleSubmit = async () => {
    try {
      // console.log(selectedChallenge._id)
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/dailyChallenge/submit_solution`,
        {
          solution: userInput,
          challengeId: selectedChallenge._id,
          date:selectedChallenge.date
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsSubmitted(true);
        alert("Submitted successfully!");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit solution.");
    }
  };

  return (
    <div className="flex bg-white text-gray-800">
      {/* Left Panel */}
      <div className="flex flex-col flex-[3] border-r border-gray-300 p-6 bg-gray-50 relative">
        <div className="overflow-auto mb-4 pr-4" style={{ maxHeight: "calc(100vh - 200px)" }}>
          <div className="prose prose-gray max-w-none">
            <ReactMarkdown>{selectedChallenge.content}</ReactMarkdown>
          </div>

          <textarea
            className="w-full mt-4 p-2 border border-gray-300 rounded focus:outline-blue-400"
            rows={6}
            placeholder="Type your solution here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>

        <div className="absolute bottom-0 left-6 right-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
          >
            {isSubmitted ? "Re-Submit Solution" : "Submit"}
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-[1] bg-white p-4 overflow-y-auto border-l border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Challenges</h3>
        <ul className="space-y-3">
          {allChallenges
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((challenge) => (
              <li
                key={challenge._id}
                onClick={() => handleChallengeClick(challenge)}
                className={`cursor-pointer px-4 py-2 rounded-lg border border-gray-300 hover:bg-blue-50 transition-colors duration-150 ${
                  selectedChallenge._id === challenge._id
                    ? "bg-blue-100 border-blue-300 text-blue-700"
                    : ""
                }`}
              >
                <div className="text-sm font-medium">{challenge.topic}</div>
                <div className="text-xs text-gray-500">{challenge.date}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default DailyChallenge;
