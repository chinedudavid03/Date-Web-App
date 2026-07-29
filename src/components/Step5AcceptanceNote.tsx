import React from 'react';
import { motion } from 'motion/react';
import { Heart, Car, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  selectedDate: string;
  selectedTime: string;
  selectedFood: string[];
  onAccept: () => void;
}

export const Step5AcceptanceNote: React.FC<Props> = ({
  selectedDate,
  selectedTime,
  selectedFood,
  onAccept,
}) => {
  const handleClick = () => {
    sound.playCelebration();
    onAccept();
  };

  // Format date display nicely
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return 'Tomorrow';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col items-center text-center py-2 select-none w-full max-w-md mx-auto">
      {/* Animated Car Icon */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="w-16 h-16 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-pink-300/50"
      >
        <Car className="w-8 h-8" />
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        id="step5-heading"
        className="text-2xl sm:text-3xl font-extrabold font-display text-pink-700 mb-4 leading-snug"
      >
        glad you didn't say no. be ready by {selectedTime || '6'}, I'm coming to get you 🚗
      </motion.h2>

      {/* Date itinerary summary pill */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full bg-pink-50/90 border border-pink-200 rounded-2xl p-4 mb-6 text-left shadow-sm space-y-2"
      >
        <div className="flex items-center justify-between text-xs font-extrabold text-pink-500 uppercase tracking-wider border-b border-pink-200/60 pb-1.5">
          <span>Date Itinerary Summary</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        </div>
        <div className="flex items-center justify-between text-sm text-pink-900 font-medium">
          <span className="text-pink-600 font-bold">When:</span>
          <span>{formatDateDisplay(selectedDate)} @ {selectedTime}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-pink-900 font-medium">
          <span className="text-pink-600 font-bold">Food Vibe:</span>
          <span className="capitalize">{selectedFood.join(', ')}</span>
        </div>
      </motion.div>

      {/* Five heart icons */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-2 mb-4 text-pink-500 text-2xl"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          >
            <Heart className="w-7 h-7 fill-pink-500 text-pink-500 drop-shadow-sm" />
          </motion.div>
        ))}
      </motion.div>

      {/* P.S. Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs sm:text-sm text-gray-500 italic max-w-sm mb-8 leading-relaxed bg-white/70 p-3 rounded-xl border border-gray-200/70"
      >
        P.S. normal people text, I made a website on Replit during lunch for you. no big deal.
      </motion.p>

      {/* Primary Action Button */}
      <motion.button
        id="btn-step5-accept"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold font-display px-8 py-3.5 rounded-full shadow-lg shadow-pink-500/30 text-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-300"
      >
        <span>ok, I accept 💖</span>
      </motion.button>
    </div>
  );
};
