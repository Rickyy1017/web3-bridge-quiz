'use client';

import React, { useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { QuestionCard } from './QuestionCard';
import { ScoreDisplay } from './ScoreDisplay';
import { Leaderboard } from './Leaderboard';
import { ThemeToggle } from './ThemeToggle';

export const QuizGame: React.FC = () => {
  const { questions, quizState, handleAnswer, resetQuiz, submitScore } = useQuiz();
  const [playerName, setPlayerName] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const currentQuestion = questions[quizState.currentQuestionIndex];

  const handleSubmitScore = () => {
    if (playerName.trim()) {
      submitScore(playerName.trim());
      setPlayerName('');
    }
  };

  if (quizState.isGameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h2>
          <p className="text-xl text-gray-600 mb-6">
            Your Score: {quizState.score}/{questions.length}
          </p>
          {!showLeaderboard && (
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              />
              <button
                onClick={handleSubmitScore}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Submit Score
              </button>
            </div>
          )}
          <div className="space-y-4">
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
            </button>
            {showLeaderboard && <Leaderboard leaderboard={quizState.leaderboard} />}
            <button
              onClick={resetQuiz}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <ScoreDisplay score={quizState.score} totalQuestions={questions.length} />
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={quizState.selectedAnswer}
          showFeedback={quizState.showFeedback}
          timeLeft={quizState.timeLeft}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
};
