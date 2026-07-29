import React, { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

export const FloatingHearts: React.FC = () => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const emojis = ['💕', '🌸', '💖', '💗', '✨', '🐾', '🎀'];
    const initialParticles: HeartParticle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.random() * 1.5 + 0.8, // 0.8rem to 2.3rem
      duration: Math.random() * 8 + 7, // 7s to 15s
      delay: Math.random() * 8,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setParticles(initialParticles);
  }, []);

  const addInteractiveHeart = (e: React.MouseEvent) => {
    const newHeart: HeartParticle = {
      id: Date.now(),
      left: (e.clientX / window.innerWidth) * 100,
      size: Math.random() * 1.2 + 1,
      duration: 4,
      delay: 0,
      emoji: '💖',
    };
    setParticles((prev) => [...prev.slice(-25), newHeart]);
  };

  return (
    <div
      aria-hidden="true"
      onClick={addInteractiveHeart}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-heart"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            filter: 'drop-shadow(0 2px 6px rgba(244, 114, 182, 0.3))',
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};
