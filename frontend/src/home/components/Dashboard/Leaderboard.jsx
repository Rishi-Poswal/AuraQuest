import React, { useState, useEffect } from 'react';
import { Crown, Trophy, Medal, User } from 'lucide-react';
import axios from 'axios';

const ITEMS_PER_PAGE = 20;

const Leaderboard = () => {
  const [currentCategory, setCurrentCategory] = useState('overall');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState({
    overall: [],
    batch: [],
    branch: []
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/leaderboard/get_leaderboard`);
        const { leaderboard, currentUser } = res.data;

        console.log(res.data)

        const overall = leaderboard;
        const batch = leaderboard.filter((user) => user.batch === currentUser.batch);
        const branch = leaderboard.filter((user) => user.batch === currentUser.batch && user.branch === currentUser.branch);

        setCategories({ overall, batch, branch });
        setCurrentUser(currentUser);
      } catch (err) {
        console.error('Failed to fetch leaderboard data:', err);
      }
    };

    fetchLeaderboardData();
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="text-warning" size={24} />;
    if (rank === 2) return <Trophy className="text-secondary" size={24} />;
    if (rank === 3) return <Medal className="text-amber-600" size={24} />;
    return <span className="fw-bold">{rank}</span>;
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = categories[currentCategory]?.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil((categories[currentCategory]?.length || 0) / ITEMS_PER_PAGE);

  return (
    <div className="container p-4">
      <div className="nav nav-tabs mb-4">
        {[
          { key: 'overall', label: 'Overall' },
          { key: 'batch', label: `Batch ${currentUser?.batch || ''}` },
          { key: 'branch', label: `Branch (${currentUser?.batch || ''}-${currentUser?.branch || ''})` }
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`nav-link ${currentCategory === key ? 'active' : ''}`}
            onClick={() => {
              setCurrentCategory(key);
              setCurrentPage(1);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {currentUser && (
        <div className="card mb-4 bg-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  {currentUser.profilePic ? (
                    <img
                      src={currentUser.profilePic}
                      alt={currentUser.username}
                      className="rounded-circle"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <User className="text-white" size={24} />
                  )}
                </div>
                <span className="fw-bold">#{currentUser.rank}</span>
                <span className="fw-bold">{currentUser.username}</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span>{currentUser.aura.toLocaleString()} points</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Name & Details</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user) => (
                <tr key={user.rank}>
                  <td className="align-middle">
                    {getRankIcon(user.rank)}
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        {user.profilePic ? (
                          <img
                            src={user.profilePic}
                            alt={user.username}
                            className="rounded-circle"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <User className="text-white" size={24} />
                        )}
                      </div>
                      <span className="fw-semibold">{user.username}</span>
                    </div>
                  </td>
                  <td className="align-middle">{user.aura.toLocaleString()}</td>
                  <td className="align-middle">
                    {user.name} <br />
                    <small>{user.branch} | Batch {user.batch}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Showing {startIndex + 1}-{Math.min(endIndex, categories[currentCategory].length)} of {categories[currentCategory].length}
        </span>
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
