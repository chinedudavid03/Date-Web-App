import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  selectedDate: string;
  selectedTime: string;
  onConfirm: (date: string, time: string) => void;
}

export const Step3DateTime: React.FC<Props> = ({
  selectedDate: initialDate,
  selectedTime: initialTime,
  onConfirm,
}) => {
  // Get tomorrow's date formatted YYYY-MM-DD
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [date, setDate] = useState<string>(initialDate || getTomorrowDate());
  const [time, setTime] = useState<string>(initialTime || '07:00 PM');
  const [error, setError] = useState<string>('');

  // Generate 30-minute intervals between 12:00 PM and 9:00 PM
  const timeOptions = [
    '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM',
    '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM',
    '09:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setError('Please pick a date!');
      return;
    }
    sound.playPop();
    onConfirm(date, time);
  };

  return (
    <div className="flex flex-col items-center text-center py-2 select-none w-full max-w-md mx-auto">
      {/* Icon header */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-4 border-2 border-pink-200 shadow-sm"
      >
        <Calendar className="w-8 h-8 text-pink-600" />
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        id="step3-heading"
        className="text-2xl sm:text-3xl font-extrabold font-display text-pink-700 mb-2"
      >
        📅🐾 So... when are you free?
      </motion.h2>

      <p className="text-sm text-pink-500 mb-6 font-medium">
        Select your ideal day & time for our date!
      </p>

      {/* Form inputs */}
      <form onSubmit={handleSubmit} className="w-full space-y-5 text-left bg-pink-50/70 p-5 sm:p-6 rounded-2xl border border-pink-200/80 shadow-inner">
        {/* Date Input */}
        <div>
          <label className="block text-sm font-bold font-display text-pink-800 mb-1.5 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-pink-500" />
            <span>Pick a Day 🗓️</span>
          </label>
          <input
            id="input-date"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl font-medium text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 cursor-pointer"
          />
        </div>

        {/* Time Dropdown */}
        <div>
          <label className="block text-sm font-bold font-display text-pink-800 mb-1.5 flex items-center gap-2">
            <Clock className="w-4 h-4 text-pink-500" />
            <span>What Time? ⏰</span>
          </label>
          <select
            id="input-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl font-medium text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 cursor-pointer"
          >
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-xs text-rose-600 font-bold bg-rose-100 p-2 rounded-lg text-center">
            {error}
          </p>
        )}

        {/* Submit button */}
        <div className="pt-2 flex justify-center">
          <motion.button
            id="btn-step3-submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold font-display py-3.5 px-6 rounded-full shadow-lg shadow-pink-500/30 text-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            <Sparkles className="w-5 h-5" />
            <span>set the date! 💕</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
};
