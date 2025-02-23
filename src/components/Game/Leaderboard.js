import React from 'react';

const Leaderboard = ({ scores }) => {
  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <div className="leaderboard-list">
        {scores.map((score, index) => (
          <div key={index} className="leaderboard-item">
            <span className="rank">{index + 1}</span>
            <span className="player">{score.playerName || 'Anonymous'}</span>
            <span className="score">{score.score}</span>
            <span className="accuracy">{score.accuracy}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;