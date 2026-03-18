import { LetterDisplayProps } from '../types';

/**
 * LetterDisplay
 *
 * A centered "stage" that appears when a letter is active.
 * Shows: big emoji + letter + word label.
 * Uses the `key` trick (timestamp) to re-animate on same-letter re-tap.
 */
export function LetterDisplay({ active }: LetterDisplayProps) {
  if (!active) {
    return (
      <div className="flex flex-col items-center justify-center h-32 sm:h-40">
        <p className="font-body text-white/50 text-base sm:text-lg font-semibold italic">
          👆 Tap any letter above!
        </p>
      </div>
    );
  }

  const { data, timestamp } = active;

  return (
    // `key` forces React to remount → re-runs CSS animations
    <div
      key={`${data.letter}-${timestamp}`}
      className="flex flex-col items-center justify-center gap-2 py-4"
    >
      {/* Emoji — floats gently */}
      <span
        className="text-7xl sm:text-8xl animate-bounce-in"
        role="img"
        aria-label={data.word}
      >
        {data.emoji}
      </span>

      {/* Big letter */}
      <span
        className={`
          font-display text-6xl sm:text-7xl text-white drop-shadow-lg
          animate-fade-up
        `}
      >
        {data.letter}
      </span>

      {/* Word */}
      <span className="font-body text-white text-xl sm:text-2xl font-bold animate-fade-up">
        is for{' '}
        <span className="underline decoration-wavy decoration-yellow-300">
          {data.word}
        </span>
      </span>

      {/* Phonics badge */}
      <span className="font-body bg-white/20 text-white text-sm sm:text-base font-semibold px-4 py-1 rounded-full mt-1 animate-fade-up">
        Sound: "{data.phonics}"
      </span>
    </div>
  );
}
