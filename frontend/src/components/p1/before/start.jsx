import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';

const InteractiveComponent = ( { updateStage} ) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const handleStart = () => {
    setCountdown(5); // Inicia el contador en 5
    setShowCelebration(true);

  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      handleEvent();
      setTimeout(() => setShowCelebration(false), 8000); 
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleEvent = () => {
    updateStage(2)
  };

  return (
    <div className="w-full min-h-full rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {showCelebration && <Confetti numberOfPieces={500} recycle={false} />}

      <div className="flex gap-6 animate-slideUp">
        <button
          className="flex items-center gap-2 bg-white text-purple-600 text-3xl px-8 py-6 rounded-lg font-semibold shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer"
          onClick={handleStart}
          disabled={countdown !== null} // Deshabilita el botón mientras cuenta
        >
          {countdown !== null ? (
            <span className="text-4xl font-bold animate-pulse">{countdown}</span>
          ) : (
            <>
              <Sparkles size={24} />
              <span>Quiero empezar</span>
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-pulse {
          animation: pulse 1s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default InteractiveComponent;
