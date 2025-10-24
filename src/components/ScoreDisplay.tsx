'use client';

import React from 'react';

interface ScoreDisplayProps {
  score: number;
  totalQuestions: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, totalQuestions }) => {
  return (
    <div className="flex justify-between items-center mb-8 p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white">
      <div className="text-lg font-bold">
        Question {score + 1} of {totalQuestions}
      </div>
      <div className="text-2xl font-bold">
        Score: {score}
      </div>
    </div>
  );
};
