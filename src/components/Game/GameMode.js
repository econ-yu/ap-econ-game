import React, { useState, useEffect } from 'react';
import { getRandomQuestion } from '../../services/dataService';
import Leaderboard from './Leaderboard';
import './GameMode.css';

const GameMode = () => {
  const [mode, setMode] = useState('practice');
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  const getNewQuestion = () => {
    const newQuestion = getRandomQuestion();
    setQuestion(newQuestion);
  };

  const handleAnswer = (selectedEffect) => {
    if (!question) return;

    const isCorrect = selectedEffect === question.correctAnswer;

    if (mode === 'competition') {
      setScore(prev => prev + (isCorrect ? 10 : -5));
    }

    setStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    alert(isCorrect ?
      `Correct!\n${question.explanation}` :
      `Wrong. The correct answer is ${question.correctAnswer}\n${question.explanation}`
    );

    getNewQuestion();
  };

  const handleStartCompetition = () => {
    setMode('competition');
    setShowNameInput(true);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setShowNameInput(false);
    startGame();
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setStats({ correct: 0, total: 0 });
    if (mode === 'competition') {
      setTimeLeft(60);
    }
    getNewQuestion();
  };

  const handleGameOver = () => {
    const finalScore = score;
    const accuracy = Math.round(stats.correct/stats.total*100);

    const newScore = {
      playerName: playerName || 'Anonymous',
      score: finalScore,
      accuracy: accuracy,
      timestamp: new Date().toISOString()
    };

    setLeaderboard(prev => {
      const newLeaderboard = [...prev, newScore]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      return newLeaderboard;
    });

    alert(`Game Over!\nFinal Score: ${finalScore}\nAccuracy: ${accuracy}%`);
  };

  useEffect(() => {
    let timer;
    if (mode === 'competition' && gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameActive(false);
            clearInterval(timer);
            handleGameOver();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mode, gameActive, timeLeft, score, stats]);

  return (
    <div className="game-container">
      <div className="mode-selector">
        <button
          onClick={() => setMode('practice')}
          className={mode === 'practice' ? 'active' : ''}
        >
          Practice Mode
        </button>
        <button
          onClick={handleStartCompetition}
          className={mode === 'competition' ? 'active' : ''}
        >
          Competition Mode
        </button>
      </div>

      {showNameInput ? (
        <div className="name-input-container">
          <form onSubmit={handleNameSubmit}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name (optional)"
            />
            <button type="submit">Start Game</button>
          </form>
        </div>
      ) : !gameActive ? (
        mode === 'practice' && <button onClick={startGame} className="start-button">
          Start Game
        </button>
      ) : (
        <div className="game-area">
          {mode === 'competition' && (
            <div className="game-stats">
              <div>Time: {timeLeft}s</div>
              <div>Score: {score}</div>
            </div>
          )}

          {question && (
            <div className="question-area">
              <h3>Question:</h3>
              {question.questionType === 'policy' ? (
                <div className="question-content">
                  <div className="question-policy">
                    <strong>Policy:</strong><br />
                    {question.policy}
                  </div>
                  <div className="question-target">
                    <strong>Effect on:</strong><br />
                    {question.variable}
                  </div>
                </div>
              ) : (
                <div className="question-content">
                  <div className="question-event">
                    <strong>Event:</strong><br />
                    {question.event}
                  </div>
                  <div className="question-target">
                    <strong>Effect on:</strong><br />
                    {question.curve} in {question.diagram}
                  </div>
                </div>
              )}

              <div className="answer-buttons">
                <button onClick={() => handleAnswer('increase')}>
                  Increase
                </button>
                <button onClick={() => handleAnswer('decrease')}>
                  Decrease
                </button>
              </div>
            </div>
          )}

          <div className="stats">
            Accuracy: {stats.total > 0 ? Math.round(stats.correct/stats.total*100) : 0}%
            ({stats.correct}/{stats.total})
          </div>
        </div>
      )}

      {mode === 'competition' && !gameActive && (
        <Leaderboard scores={leaderboard} />
      )}
    </div>
  );
};

export default GameMode;