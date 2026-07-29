/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppStep, ProposalData } from './types';
import { FloatingHearts } from './components/FloatingHearts';
import { StepProgressBar } from './components/StepProgressBar';
import { HeaderNav } from './components/HeaderNav';
import { Step1Proposal } from './components/Step1Proposal';
import { Step2Surprised } from './components/Step2Surprised';
import { Step3DateTime } from './components/Step3DateTime';
import { Step4FoodPreference } from './components/Step4FoodPreference';
import { Step5AcceptanceNote } from './components/Step5AcceptanceNote';
import { Step6Checkout } from './components/Step6Checkout';

export default function App() {
  const [step, setStep] = useState<AppStep>(1);

  // Proposal State
  const [proposalData, setProposalData] = useState<ProposalData>({
    senderName: '',
    recipientName: '',
    selectedDate: '',
    selectedTime: '06:00 PM',
    selectedFood: ['sushi', 'pizza'],
    isPaid: false,
  });

  const nextStep = () => {
    setStep((prev) => (prev < 6 ? ((prev + 1) as AppStep) : prev));
  };

  const prevStep = () => {
    setStep((prev) => (prev > 1 ? ((prev - 1) as AppStep) : prev));
  };

  const handleRestart = () => {
    setStep(1);
    setProposalData((prev) => ({
      ...prev,
      isPaid: false,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fce7f3] via-[#fbcfe8] to-[#f9a8d4] flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 font-['Quicksand',sans-serif] relative overflow-x-hidden">
      {/* Floating Background Hearts & Petals */}
      <FloatingHearts />

      {/* Main Container Card Area */}
      <div className="w-full max-w-lg mx-auto my-auto z-10 flex flex-col items-center">
        {/* Navigation Header */}
        <HeaderNav onReset={handleRestart} />

        {/* Centered White Card Modal */}
        <motion.div
          layout
          className="w-full bg-white/95 backdrop-blur-md rounded-[24px] shadow-2xl shadow-pink-400/30 border border-white/80 p-6 sm:p-8 relative overflow-hidden transition-all duration-300"
        >
          {/* Top Step Progress Bar */}
          <StepProgressBar currentStep={step} totalSteps={6} />

          {/* Animated Step Transitions */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Step1Proposal onYes={nextStep} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Step2Surprised onNext={nextStep} />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Step3DateTime
                  selectedDate={proposalData.selectedDate}
                  selectedTime={proposalData.selectedTime}
                  onConfirm={(date, time) => {
                    setProposalData((prev) => ({
                      ...prev,
                      selectedDate: date,
                      selectedTime: time,
                    }));
                    nextStep();
                  }}
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Step4FoodPreference
                  selectedFood={proposalData.selectedFood}
                  onConfirm={(foods) => {
                    setProposalData((prev) => ({
                      ...prev,
                      selectedFood: foods,
                    }));
                    nextStep();
                  }}
                />
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Step5AcceptanceNote
                  selectedDate={proposalData.selectedDate}
                  selectedTime={proposalData.selectedTime}
                  selectedFood={proposalData.selectedFood}
                  onAccept={nextStep}
                />
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Step6Checkout
                  selectedTime={proposalData.selectedTime}
                  onGoBack={prevStep}
                  onRestart={handleRestart}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer credits */}
      <footer className="text-center text-xs font-semibold text-pink-700/80 z-10 pt-4 pb-2">
        Made with 💕 • Designed By DAVID 
      </footer>
    </div>
  );
}
