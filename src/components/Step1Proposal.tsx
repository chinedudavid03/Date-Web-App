import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/sound';

interface Props {
  onYes: () => void;
}

const dodgePhrases = [
  "Nice try! 😜",
  "Nope! 🏃‍♂️",
  "Too slow! 💨",
  "Over here! 😜",
  "Click YES instead! 💕",
  "You can't say no! 💖",
  "Oops! 🙈",
  "Not a chance! 😉",
  "Butterfingers! 🧈",
  "YES is over there! 👉"
];

export const Step1Proposal: React.FC<Props> = ({ onYes }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);

  // High quality cute pug image with fallbacks
  const pugImage = "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80";

  const moveNoButton = () => {
    sound.playDodge();
    setDodgeCount((prev) => prev + 1);

    // Pick a random funny phrase
    const randomPhrase = dodgePhrases[Math.floor(Math.random() * dodgePhrases.length)];
    setCurrentPhrase(randomPhrase);
    setShowTooltip(true);

    if (!containerRef.current || !noButtonRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = noButtonRef.current.getBoundingClientRect();

    const padding = 24;
    const maxX = containerRect.width - btnRect.width - padding * 2;
    const maxY = containerRect.height - btnRect.height - padding * 2;

    // Generate random coordinates inside the card container
    let newX = Math.floor(Math.random() * maxX) + padding;
    let newY = Math.floor(Math.random() * maxY) + padding;

    // Keep away from center top area if possible
    if (newY < 120 && newX > containerRect.width / 4 && newX < (containerRect.width * 3) / 4) {
      newY += 140;
    }

    setNoPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    sound.playCelebration();
    onYes();
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[440px] flex flex-col items-center justify-between text-center select-none py-2"
    >
      {/* Pug Image with cute pink badge frame */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative group mb-4"
      >
        <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
        <img
          src={pugImage}
          alt="Cute pleading pug dog"
          referrerPolicy="no-referrer"
          className="relative w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full border-4 border-white shadow-md mx-auto"
        />
        <div className="absolute -bottom-1 -right-1 bg-white p-2 rounded-full shadow-md text-xl animate-bounce">
          🌸
        </div>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-2 mb-6"
      >
        <h1 id="step1-heading" className="text-2xl sm:text-3xl font-bold font-display text-pink-700 leading-snug">
          Will you go on a date with me? 🌸
        </h1>
        <p className="text-sm text-pink-500/90 font-medium">
          (Choose wisely... or try to 😉)
        </p>
      </motion.div>

      {/* Dodge count easter egg badge */}
      {dodgeCount > 0 && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-4 text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-200"
        >
          Failed "NO" attempts: {dodgeCount} 🏃‍♂️
        </motion.div>
      )}

      {/* Button Row Container */}
      <div className="w-full flex items-center justify-center gap-4 sm:gap-6 pt-2 pb-4 min-h-[64px] relative">
        {/* YES Button */}
        <motion.button
          id="btn-yes"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleYesClick}
          className="z-10 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold font-display px-8 py-3.5 rounded-full shadow-lg shadow-pink-500/30 text-lg transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
          <span>YES 💕</span>
        </motion.button>

        {/* NO Button (Evasive logic) */}
        <button
          id="btn-no"
          ref={noButtonRef}
          onMouseEnter={moveNoButton}
          onTouchStart={(e) => {
            e.preventDefault();
            moveNoButton();
          }}
          onClick={moveNoButton}
          style={
            noPosition
              ? {
                  position: 'absolute',
                  left: `${noPosition.x}px`,
                  top: `${noPosition.y}px`,
                  transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  zIndex: 20,
                }
              : { zIndex: 10 }
          }
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold font-display px-6 py-3.5 rounded-full shadow-md text-base transition-colors cursor-pointer focus:outline-none"
        >
          <span>NO 💜</span>
        </button>

        {/* Floating tooltip phrase near dodge button */}
        <AnimatePresence>
          {showTooltip && currentPhrase && (
            <motion.div
              key={dodgeCount}
              initial={{ opacity: 0, y: -5, scale: 0.8 }}
              animate={{ opacity: 1, y: -25, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-6 text-xs font-extrabold text-pink-600 bg-white/95 backdrop-blur-sm border border-pink-300 px-3 py-1 rounded-full shadow-md pointer-events-none z-30"
            >
              {currentPhrase}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
