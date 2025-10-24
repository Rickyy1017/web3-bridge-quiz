'use client';

import React from 'react';
import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  showFeedback: boolean;
  timeLeft: number;
  onAnswer: (answer: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  showFeedback,
  timeLeft,
  onAnswer,
}) => {
  const getButtonClass = (option: string) => {
    if (!showFeedback) {
      return selectedAnswer === option
        ? 'bg-red-600 text-white'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    }

    if (option === question.correctAnswer) {
      return 'bg-green-500 text-white';
    }

    if (option === selectedAnswer && option !== question.correctAnswer) {
      return 'bg-red-500 text-white';
    }

    return 'bg-gray-200 text-gray-800';
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-red-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">Time left: {timeLeft}s</p>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">{question.question}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && onAnswer(option)}
            disabled={showFeedback}
            className={`p-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105 disabled:cursor-not-allowed ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className="mt-6">
          {selectedAnswer === question.correctAnswer ? (
            <p className="text-green-600 text-xl font-bold">Correct! 🎉</p>
          ) : (
            <p className="text-red-600 text-xl font-bold">
              Incorrect. The correct answer is: {question.correctAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
