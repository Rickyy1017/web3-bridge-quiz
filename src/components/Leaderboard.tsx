'use client';

import React from 'react';
import { LeaderboardEntry } from '@/types';

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Leaderboard</h3>
      {leaderboard.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No scores yet. Be the first!</p>
      ) : (
        <div className="space-y-2">
          {leaderboard.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
            >
              <div className="flex items-center">
                <span className="font-bold text-purple-600 dark:text-purple-400 mr-3">
                  #{index + 1}
                </span>
                <span className="text-gray-800 dark:text-white">{entry.name}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-800 dark:text-white">{entry.score}</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {new Date(entry.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
