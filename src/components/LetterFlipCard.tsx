import { useState } from 'react';
import { LetterData } from '../types';
import { FloatingObject } from './FloatingObject';

interface Props {
  data: LetterData;
  onSpeak: (letter: string, word: string) => void;
}

/**
 * LetterFlipCard
 * Front: large letter. Tap → flips to show object.
 * Back: floating object + word. Tap → says "A... Apple"
 */
export function LetterFlipCard({ data, onSpeak }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [rotating, setRotating] = useState(false);

  function handleClick() {
    if (!flipped) {
      setFlipped(true);
    } else {
      setRotating(true);
      onSpeak(data.letter, data.word);
      setTimeout(() => setRotating(false), 700);
    }
  }

  return (
    <div
      className="w-full h-full cursor-pointer select-none"
      style={{ perspective: '900px' }}
      onClick={handleClick}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* ── Front: Letter ───────────────────────────────────── */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className={`
            absolute inset-0 rounded-3xl
            flex flex-col items-center justify-center
            ${data.color} shadow-2xl
          `}
        >
          <span
            className="font-display text-white drop-shadow-lg"
            style={{ fontSize: 'clamp(5rem, 20vw, 9rem)', lineHeight: 1 }}
          >
            {data.letter}
          </span>
          <span className="font-body text-white/70 text-sm mt-2 font-semibold">
            tap to reveal
          </span>
        </div>

        {/* ── Back: Object ────────────────────────────────────── */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="
            absolute inset-0 rounded-3xl
            flex flex-col items-center justify-center gap-3
            bg-gradient-to-br from-indigo-100 to-purple-100
            shadow-2xl overflow-hidden
          "
        >
          {/* Ghost letter behind */}
          <span
            className="absolute font-display text-black/5 pointer-events-none select-none"
            style={{ fontSize: '18rem', lineHeight: 1, top: '-2rem', right: '-1rem' }}
            aria-hidden="true"
          >
            {data.letter}
          </span>

          {/* Floating object */}
          <div className="w-44 h-44 sm:w-52 sm:h-52 z-10">
            <FloatingObject letter={data.letter} rotating={rotating} />
          </div>

          {/* Word */}
          <span
            className="font-display text-indigo-800 z-10 drop-shadow"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)' }}
          >
            {data.word}
          </span>
          <span className="font-body text-indigo-500 text-sm font-semibold z-10">
            tap to hear it!
          </span>
        </div>
      </div>
    </div>
  );
}