import React, { useState } from 'react';
import { Volume2, VolumeX, HeartHandshake } from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  onReset: () => void;
}

export const HeaderNav: React.FC<Props> = ({ onReset }) => {
  const [soundOn, setSoundOn] = useState(true);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    sound.enabled = next;
    if (next) sound.playPop();
  };

  return (
    <div className="w-full flex items-center justify-between px-2 pb-4 select-none">
      <button
        onClick={onReset}
        className="flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-800 transition cursor-pointer bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-200 shadow-sm"
      >
        <HeartHandshake className="w-4 h-4 text-pink-500" />
        <span>Date Proposal 🌸</span>
      </button>

      <button
        onClick={toggleSound}
        title="Toggle Sound Effects"
        className="flex items-center gap-1 text-xs font-bold text-pink-600 hover:text-pink-800 transition cursor-pointer bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-200 shadow-sm"
      >
        {soundOn ? (
          <>
            <Volume2 className="w-4 h-4 text-pink-500" />
            <span>Sound ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-gray-400" />
            <span>Sound OFF</span>
          </>
        )}
      </button>
    </div>
  );
};
