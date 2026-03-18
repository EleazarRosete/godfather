import { useState } from 'react';
import { LetterCardProps } from '../types';

/**
 * LetterCard
 *
 * A single tappable letter tile in the alphabet grid.
 * Shows the letter large and the word label small below.
 * Plays a local "pop" animation on click; parent tracks the active state.
 */
export function LetterCard({ data, isActive, onClick }: LetterCardProps) {
  const [isPopping, setIsPopping] = useState(false);

  function handleClick() {
    setIsPopping(true);
    onClick(data);
    // Reset after animation completes
    setTimeout(() => setIsPopping(false), 400);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={`${data.letter} is for ${data.word}`}
      className={[
        // Base styles
        'relative flex flex-col items-center justify-center',
        'rounded-2xl cursor-pointer select-none',
        'w-full aspect-square',
        'shadow-md active:shadow-inner',
        'transition-transform duration-150',
        // Color from data
        data.color,
        // Active ring
        isActive ? 'ring-4 ring-white ring-offset-2 scale-105' : '',
        // Pop animation
        isPopping ? 'animate-pop' : '',
        // Hover / press
        'hover:scale-105 active:scale-95',
      ].join(' ')}
    >
      {/* Large letter */}
      <span className="font-display text-white text-3xl sm:text-4xl md:text-5xl drop-shadow">
        {data.letter}
      </span>

      {/* Small word label */}
      <span className="font-body text-white/90 text-[10px] sm:text-xs font-semibold mt-0.5 leading-none">
        {data.word}
      </span>

      {/* Active sparkle dot */}
      {isActive && (
        <span
          className="absolute top-1 right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
