import { useState, useEffect, useCallback } from 'react';
import { Question, QuizState, LeaderboardEntry } from '@/types';
import questionsData from '@/data/questions.json';

const QUESTIONS_TIME_LIMIT = 30; // seconds

export const useQuiz = () => {
  const [questions] = useState<Question[]>(questionsData);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    isGameOver: false,
    selectedAnswer: null,
    showFeedback: false,
    timeLeft: QUESTIONS_TIME_LIMIT,
    leaderboard: [],
  });

  const loadLeaderboard = useCallback(() => {
    const saved = localStorage.getItem('quizLeaderboard');
    if (saved) {
      setQuizState(prev => ({ ...prev, leaderboard: JSON.parse(saved) }));
    }
  }, []);

  const saveLeaderboard = useCallback((entry: LeaderboardEntry) => {
    const updatedLeaderboard = [...quizState.leaderboard, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    localStorage.setItem('quizLeaderboard', JSON.stringify(updatedLeaderboard));
    setQuizState(prev => ({ ...prev, leaderboard: updatedLeaderboard }));
  }, [quizState.leaderboard]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  useEffect(() => {
    if (quizState.timeLeft > 0 && !quizState.isGameOver && !quizState.showFeedback) {
      const timer = setTimeout(() => {
        setQuizState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (quizState.timeLeft === 0 && !quizState.showFeedback) {
      handleAnswer('');
    }
  }, [quizState.timeLeft, quizState.isGameOver, quizState.showFeedback]);

  const handleAnswer = useCallback((answer: string) => {
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answer,
      showFeedback: true,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));

    setTimeout(() => {
      if (quizState.currentQuestionIndex < questions.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          selectedAnswer: null,
          showFeedback: false,
          timeLeft: QUESTIONS_TIME_LIMIT,
        }));
      } else {
        setQuizState(prev => ({ ...prev, isGameOver: true, showFeedback: false }));
      }
    }, 2000);
  }, [questions, quizState.currentQuestionIndex]);

  const resetQuiz = useCallback(() => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      isGameOver: false,
      selectedAnswer: null,
      showFeedback: false,
      timeLeft: QUESTIONS_TIME_LIMIT,
      leaderboard: quizState.leaderboard,
    });
  }, [quizState.leaderboard]);

  const submitScore = useCallback((name: string) => {
    const entry: LeaderboardEntry = {
      name,
      score: quizState.score,
      date: new Date().toISOString(),
    };
    saveLeaderboard(entry);
  }, [quizState.score, saveLeaderboard]);

  return {
    questions,
    quizState,
    handleAnswer,
    resetQuiz,
    submitScore,
  };
};
