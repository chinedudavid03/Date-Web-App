import React from 'react';
import { motion } from 'motion/react';
import { sound } from '../utils/sound';

interface Props {
  onNext: () => void;
}

export const Step2Surprised: React.FC<Props> = ({ onNext }) => {
  // SpongeBob / funny shocked meme GIF URL with high reliability
  const surprisedMemeUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGpmbm52cmQxbTVqMmoxbGFicmxvbmk0cGlsdWtsenptMGU5M2FqYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oxOCqY7D39rNj6Bu8/giphy.gif";

  const handleNextClick = () => {
    sound.playPop();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-4 select-none">
      {/* Meme image / GIF */}
      <motion.div
        initial={{ scale: 0.3, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative mb-6 group"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 rounded-3xl blur-md opacity-60 animate-pulse"></div>
        <img
          src={surprisedMemeUrl}
          alt="Shocked SpongeBob meme"
          referrerPolicy="no-referrer"
          className="relative w-52 h-52 sm:w-60 sm:h-60 object-cover rounded-2xl border-4 border-white shadow-xl mx-auto"
        />
        <div className="absolute -top-3 -right-3 text-4xl animate-bounce">
          🤯
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        id="step2-heading"
        className="text-2xl sm:text-3xl font-extrabold font-display text-pink-700 mb-3 tracking-tight leading-snug"
      >
        WAIT YOU ACTUALLY SAID YES?? 🤯
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-base sm:text-lg text-pink-600 font-medium mb-8 bg-pink-50 px-5 py-2.5 rounded-2xl border border-pink-200 shadow-sm"
      >
        "I was so ready for you to say no 😭"
      </motion.p>

      {/* Next Button */}
      <motion.button
        id="btn-step2-next"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNextClick}
        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold font-display px-8 py-3.5 rounded-full shadow-lg shadow-pink-500/30 text-lg transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-300"
      >
        <span>okay okay! -&gt;</span>
      </motion.button>
    </div>
  );
};
