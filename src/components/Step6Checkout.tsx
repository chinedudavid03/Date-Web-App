import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, CheckCircle2, ShieldCheck, ArrowLeft, PartyPopper, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface Props {
  selectedTime: string;
  onGoBack: () => void;
  onRestart: () => void;
}

export const Step6Checkout: React.FC<Props> = ({
  selectedTime,
  onGoBack,
  onRestart,
}) => {
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const triggerConfetti = () => {
    sound.playCelebration();

    // Burst 1: Center fireworks
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#e879f9', '#a855f7', '#fbbf24'],
    });

    // Burst 2: Side cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f472b6', '#fb7185', '#e879f9'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f472b6', '#fb7185', '#e879f9'],
      });
    }, 250);
  };

  const handlePay = () => {
    setIsProcessing(true);
    sound.playPop();

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      triggerConfetti();
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center text-center py-2 select-none w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!isPaid ? (
          <motion.div
            key="checkout-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full flex flex-col items-center"
          >
            {/* Header Icon: Credit Card 💳 */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-300/50"
            >
              <CreditCard className="w-8 h-8" />
            </motion.div>

            {/* Heading */}
            <h2
              id="step6-heading"
              className="text-2xl sm:text-3xl font-extrabold font-display text-pink-700 mb-2"
            >
              one small fee
            </h2>

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-pink-600/90 font-medium mb-6 px-2 leading-relaxed">
              to confirm your acceptance of this date, please complete the following transaction. totally normal. everyone does this.
            </p>

            {/* Invoice Card */}
            <div className="w-full bg-gradient-to-br from-white via-pink-50/50 to-purple-50/50 border-2 border-pink-200/90 rounded-2xl p-5 mb-6 shadow-md text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-sm">
                Official Checkout
              </div>

              <div className="flex items-start justify-between gap-4 mb-4 pt-1">
                <div>
                  <h3 className="text-lg font-extrabold font-display text-pink-900 flex items-center gap-1.5">
                    <span>Date Agreement™</span>
                    <ShieldCheck className="w-4 h-4 text-pink-500 inline" />
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">
                    one-time fee • non-refundable • absolutely worth it
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black font-display text-pink-600">
                    ₦20,000.00
                  </span>
                  <p className="text-[10px] text-gray-400">NGN</p>
                </div>
              </div>

              <div className="border-t border-pink-200/70 pt-3 flex items-center justify-between text-xs text-pink-800 font-semibold">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Total Due Now
                </span>
                <span className="text-sm font-bold text-pink-700">₦20,000.00</span>
              </div>
            </div>

            {/* Payment Button */}
            <motion.button
              id="btn-pay-499"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              disabled={isProcessing}
              onClick={handlePay}
              className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold font-display py-4 px-6 rounded-full shadow-lg shadow-pink-500/30 text-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-75 mb-4"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>pay ₦20,000.00 & confirm 💖</span>
                </>
              )}
            </motion.button>

            {/* Go Back Link */}
            <button
              id="btn-go-back"
              type="button"
              onClick={onGoBack}
              className="text-sm font-semibold text-pink-600 hover:text-pink-800 flex items-center gap-1 transition-colors cursor-pointer py-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>go back</span>
            </button>
          </motion.div>
        ) : (
          /* Payment Confirmation Receipt State */
          <motion.div
            key="checkout-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 border-4 border-emerald-200 shadow-md"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-pink-700 mb-2">
              Payment accepted! See you at {selectedTime || '8'}! 🎉
            </h2>

            <p className="text-sm text-pink-600 font-semibold mb-6 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-200">
              Transaction ID: #DATE-2026-VALUABLE-20,000 💸
            </p>

            {/* Cute receipt details */}
            <div className="w-full bg-white border border-pink-200 rounded-2xl p-5 mb-6 text-left shadow-md space-y-3 relative">
              <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                <span>RECEIPT CONFIRMATION</span>
                <span>PAID IN FULL</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-2 text-sm space-y-1.5">
                <div className="flex justify-between font-bold text-gray-800">
                  <span>1x Date Agreement™</span>
                  <span>₦20,000.00</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Guaranteed Good Time</span>
                  <span>INCLUDED</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Awkward Silence Insurance</span>
                  <span>FREE</span>
                </div>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between font-extrabold text-pink-700 text-base">
                <span>Grand Total</span>
                <span>₦20,000.00</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                type="button"
                onClick={triggerConfetti}
                className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold font-display py-3 px-4 rounded-full transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <PartyPopper className="w-4 h-4" />
                <span>More Confetti! 🎉</span>
              </button>

              <button
                type="button"
                onClick={onRestart}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold font-display py-3 px-4 rounded-full transition duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Replay Proposal 🔄</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
