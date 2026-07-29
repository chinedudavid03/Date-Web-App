import React from 'react';
import { AppStep } from '../types';
import { Heart } from 'lucide-react';

interface Props {
  currentStep: AppStep;
  totalSteps?: number;
}

export const StepProgressBar: React.FC<Props> = ({ currentStep, totalSteps = 6 }) => {
  return (
    <div className="w-full flex flex-col items-center gap-2 mb-6 select-none">
      <div className="flex items-center justify-between w-full px-2">
        <span className="text-xs font-semibold tracking-wider text-pink-500 uppercase">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-bold text-pink-400 flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 animate-pulse" />
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      <div className="w-full bg-pink-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-pink-200/60 shadow-inner">
        <div
          className="bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-500 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};
