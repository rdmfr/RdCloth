import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view' | 'both';
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ0123456789§¶#$@';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 10,
  characters = DEFAULT_CHARACTERS,
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-[#C5A059] opacity-75',
  animateOn = 'both'
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hasAnimatedOnView, setHasAnimatedOnView] = useState<boolean>(false);

  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let iteration = 0;

    const startAnimation = () => {
      setIsAnimating(true);
      iteration = 0;

      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / (maxIterations / text.length)) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        if (iteration >= maxIterations) {
          setDisplayText(text);
          setIsAnimating(false);
          clearInterval(interval);
        }

        iteration += 1;
      }, speed);
    };

    if (animateOn === 'view' || animateOn === 'both') {
      if (isInView && !hasAnimatedOnView) {
        setHasAnimatedOnView(true);
        startAnimation();
      }
    }

    if (isHovered && (animateOn === 'hover' || animateOn === 'both') && !isAnimating) {
      startAnimation();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInView, isHovered, text, speed, maxIterations, characters, animateOn, hasAnimatedOnView]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-block select-none cursor-default ${parentClassName}`}
    >
      <span className={isAnimating ? encryptedClassName : className}>{displayText}</span>
    </span>
  );
};
