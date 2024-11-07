import React, { useState } from 'react';
import { Crown, Trophy, Medal, User } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

const Leaderboard = () => {
  const [currentCategory, setCurrentCategory] = useState('today');
  const [currentPage, setCurrentPage] = useState(1);
  
  // sample data
  const categories = {
    today: Array.from({ length: 100 }, (_, i) => ({
      rank: i + 1,
      username: `User${i + 1}`,
      auraPoints: '1234',
      rankTitle: '',      //cases can be desigend to give rank title
      profilePic: '' //user profile pic to be included here
    })),
    overall: Array.from({ length: 100 }, (_, i) => ({
      rank: i + 1,
      username: `User${i + 1}`,
      auraPoints: '3455',
      rankTitle: '',
      profilePic: '' //user profile pic to be included here
    })),
    batch: Array.from({ length: 100 }, (_, i) => ({
      rank: i + 1,
      username: `User${i + 1}`,
      auraPoints: '4566',
      rankTitle: '',
      profilePic: ''  //user profile pic to be included here
    }))
  };

  // Mock current user data
  const currentUser = {
    rank: 42,
    username: "CurrentUser",
    auraPoints: 2500,
    rankTitle: "Expert",
    profilePic: ''
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="text-warning" size={24} />;
    if (rank === 2) return <Trophy className="text-secondary" size={24} />;
    if (rank === 3) return <Medal className="text-amber-600" size={24} />;
    return <span className="fw-bold">{rank}</span>;
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = categories[currentCategory].slice(startIndex, endIndex);
  const totalPages = Math.ceil(categories[currentCategory].length / ITEMS_PER_PAGE);

  return (
    <div className="container p-4">

      <div className="nav nav-tabs mb-4">
        {['today', 'overall', 'batch'].map((category) => (
          <button 
            key={category}
            className={`nav-link ${currentCategory === category ? 'active' : ''}`}
            onClick={() => {
              setCurrentCategory(category);
              setCurrentPage(1);
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

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
              <span>{currentUser.auraPoints.toLocaleString()} points</span>
              <span className="badge bg-primary rounded-pill">
                {currentUser.rankTitle}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Rank Title</th>
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
                  <td className="align-middle">{user.auraPoints.toLocaleString()}</td>
                  <td className="align-middle">
                    <span className="badge bg-secondary rounded-pill">
                      {user.rankTitle}
                    </span>
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