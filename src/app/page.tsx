'use client';

import { useState } from 'react';
import { QuizGame } from '@/components/QuizGame';
import Image from 'next/image';

export default function Home() {
  const [showGame, setShowGame] = useState(false);

  if (showGame) {
    return <QuizGame />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-red-500 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <Image
            src="/web3 bridge assessment.svg"
            alt="Web3 Bridge Assessment"
            width={400}
            height={200}
            className="mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-red-600 mb-8 font-orbitron">
          Welcome to the Quiz Game
        </h1>
        <button
          onClick={() => setShowGame(true)}
          className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105 font-orbitron"
        >
          Start Playing
        </button>
      </div>
    </main>
  );
}
