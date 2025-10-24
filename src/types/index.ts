export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  isGameOver: boolean;
  selectedAnswer: string | null;
  showFeedback: boolean;
  timeLeft: number;
  leaderboard: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
