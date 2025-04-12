import React, { useState } from "react";
import axios from "axios";

const CreateChallenge = () => {
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const generateChallenge = async () => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const topic = prompt("Enter topic:");
      const difficulty = prompt("Enter difficulty (easy, medium, hard):");

      const res = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/admin//gen_daily_challenge`, { topic, difficulty });
      setChallenge(res.data.newChallenge);
    } catch (err) {
      console.error(err);
      setError("Failed to generate challenge");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (status) => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/admin/approve/${challenge._id}`, { status });
      setMessage(`Challenge ${status} successfully.`);
      setChallenge(null); // Reset to allow another challenge generation
    } catch (err) {
      console.error(err);
      setError("Failed to update challenge status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Daily Challenge Admin</h2>

      {error && <div className="text-red-500">{error}</div>}
      {message && <div className="text-green-600">{message}</div>}

      {!challenge && (
        <button
          onClick={generateChallenge}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Daily Challenge"}
        </button>
      )}

      {challenge && (
        <div className="space-y-4 border p-4 rounded bg-gray-50">
          <h3 className="text-lg font-semibold">Generated Challenge</h3>
          <p><strong>Topic:</strong> {challenge.topic}</p>
          <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
          <pre className="bg-white p-2 border rounded whitespace-pre-wrap">{challenge.content}</pre>

          <div className="flex gap-4 mt-2">
            <button
              onClick={() => handleApproval("approved")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={loading}
            >
              Approve
            </button>
            <button
              onClick={() => handleApproval("rejected")}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              disabled={loading}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateChallenge;
