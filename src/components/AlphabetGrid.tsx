import { ALPHABET_DATA } from '../data/alphabetData';
import { AlphabetGridProps } from '../types';
import { LetterCard } from './LetterCard';

export function AlphabetGrid({ activeLetter, onLetterClick, allowedLetters }: AlphabetGridProps) {
  const letters = allowedLetters
    ? ALPHABET_DATA.filter((d) => allowedLetters.includes(d.letter))
    : ALPHABET_DATA;

  return (
    <section
      aria-label="Alphabet grid"
      className="
        grid gap-2 sm:gap-3 px-3 sm:px-6 w-full max-w-4xl mx-auto
        grid-cols-4
        sm:grid-cols-6
        lg:grid-cols-7
      "
    >
      {letters.map((data) => (
        <LetterCard
          key={data.letter}
          data={data}
          isActive={activeLetter === data.letter}
          onClick={onLetterClick}
        />
      ))}
    </section>
  );
}