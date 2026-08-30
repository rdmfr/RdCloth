import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring } from 'motion/react';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxAngle?: number;
  scale?: number;
  glareEffect?: boolean;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = '',
  maxAngle = 12,
  scale = 1.02,
  glareEffect = true
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const springConfig = { stiffness: 260, damping: 20 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scaleSpring = useSpring(1, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const rX = ((mouseY / height) * 2 - 1) * -maxAngle;
      const rY = ((mouseX / width) * 2 - 1) * maxAngle;

      rotateX.set(rX);
      rotateY.set(rY);
      scaleSpring.set(scale);

      if (glareEffect) {
        setGlarePos({
          x: (mouseX / width) * 100,
          y: (mouseY / height) * 100,
          opacity: 0.35
        });
      }
    },
    [maxAngle, scale, glareEffect, rotateX, rotateY, scaleSpring]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    scaleSpring.set(1);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  }, [rotateX, rotateY, scaleSpring]);

  return (
    <div style={{ perspective: 1000 }} className="inline-block w-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: 'preserve-3d'
        }}
        className={`relative overflow-hidden ${className}`}
      >
        {children}

        {glareEffect && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[inherit]"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
