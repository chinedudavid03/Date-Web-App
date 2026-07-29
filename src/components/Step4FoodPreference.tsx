import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, Check } from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  selectedFood: string[];
  onConfirm: (foods: string[]) => void;
}

interface FoodItem {
  id: string;
  emoji: string;
  label: string;
  desc: string;
}

const foodOptions: FoodItem[] = [
  { id: 'pizza', emoji: '🍕', label: 'Pizza', desc: 'Cheesy & cozy' },
  { id: 'Soup', emoji: '🍣', label: 'Soup', desc: 'Fresh & fancy' },
  { id: 'burgers', emoji: '🍔', label: 'Burgers', desc: 'Juicy & casual' },
  { id: 'pasta', emoji: '🍝', label: 'Pasta', desc: 'Italian romance' },
  { id: 'tacos', emoji: '🌮', label: 'Tacos', desc: 'Spicy & fun' },
  { id: 'ramen', emoji: '🍜', label: 'Ramen', desc: 'Warm & savory' },
];

export const Step4FoodPreference: React.FC<Props> = ({
  selectedFood: initialSelected,
  onConfirm,
}) => {
  const [selected, setSelected] = useState<string[]>(
    initialSelected.length > 0 ? initialSelected : ['Soup']
  );

  const toggleFood = (id: string) => {
    sound.playPop();
    if (selected.includes(id)) {
      if (selected.length > 1) {
        setSelected(selected.filter((item) => item !== id));
      }
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleNext = () => {
    sound.playPop();
    onConfirm(selected);
  };

  return (
    <div className="flex flex-col items-center text-center py-2 select-none w-full">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-3 border-2 border-pink-200 shadow-sm"
      >
        <Utensils className="w-7 h-7 text-pink-600" />
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        id="step4-heading"
        className="text-2xl sm:text-3xl font-extrabold font-display text-pink-700 mb-1"
      >
        What are we feeling? ✨🍽️
      </motion.h2>

      {/* Sub-heading */}
      <p className="text-sm font-semibold text-pink-500 mb-6 uppercase tracking-wider">
        pick your vibe
      </p>

      {/* 6 Grid Option Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full mb-6">
        {foodOptions.map((item, index) => {
          const isSelected = selected.includes(item.id);
          return (
            <motion.button
              key={item.id}
              id={`food-option-${item.id}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => toggleFood(item.id)}
              className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                isSelected
                  ? 'border-pink-500 bg-gradient-to-b from-pink-50 to-pink-100/90 shadow-md ring-2 ring-pink-400/40'
                  : 'border-pink-200/80 bg-white hover:border-pink-300 hover:bg-pink-50/50 shadow-sm'
              }`}
            >
              {/* Selected badge check icon */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-0.5 shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <span className="text-4xl mb-2 animate-bounce-short">
                {item.emoji}
              </span>
              <span className="font-extrabold font-display text-pink-800 text-base">
                {item.label}
              </span>
              <span className="text-xs text-pink-500/80 font-medium mt-0.5">
                {item.desc}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Advance Button */}
      <motion.button
        id="btn-step4-confirm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        disabled={selected.length === 0}
        className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 text-white font-bold font-display px-8 py-3.5 rounded-full shadow-lg shadow-pink-500/30 text-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-300"
      >
        <span>lock in this menu! 🍽️✨</span>
      </motion.button>
    </div>
  );
};
