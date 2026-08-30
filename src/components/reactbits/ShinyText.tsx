import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shineColor?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5.5,
  className = '',
  shineColor = 'rgba(255, 235, 180, 0.95)'
}) => {
  return (
    <span
      className={`inline-block relative overflow-hidden bg-clip-text text-transparent ${
        disabled ? 'text-inherit' : ''
      } ${className}`}
      style={{
        backgroundImage: disabled
          ? 'none'
          : `linear-gradient(120deg, currentColor 0%, currentColor 40%, ${shineColor} 50%, currentColor 60%, currentColor 100%)`,
        backgroundSize: '220% 100%',
        animation: disabled ? 'none' : `shine-sweep ${speed}s ease-in-out infinite`,
        WebkitBackgroundClip: 'text'
      }}
    >
      {text}
    </span>
  );
};
