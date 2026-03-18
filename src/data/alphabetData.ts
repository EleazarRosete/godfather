import { LetterData } from '../types';

// ─── Color palette ────────────────────────────────────────────────────────────
// Each letter gets a distinct bright color for the kid-friendly grid.
// Colors cycle through a curated set so adjacent letters contrast nicely.

const COLORS = [
  'bg-red-400',
  'bg-orange-400',
  'bg-amber-400',
  'bg-yellow-400',
  'bg-lime-400',
  'bg-green-400',
  'bg-teal-400',
  'bg-cyan-400',
  'bg-sky-400',
  'bg-blue-400',
  'bg-violet-400',
  'bg-purple-400',
  'bg-fuchsia-400',
  'bg-pink-400',
  'bg-rose-400',
];

// ─── Raw letter definitions ───────────────────────────────────────────────────

const RAW: Omit<LetterData, 'color'>[] = [
  { letter: 'A', word: 'Apple',      emoji: '🍎', phonics: 'Ah'  },
  { letter: 'B', word: 'Ball',       emoji: '⚽', phonics: 'Buh' },
  { letter: 'C', word: 'Cat',        emoji: '🐱', phonics: 'Kuh' },
  { letter: 'D', word: 'Dog',        emoji: '🐶', phonics: 'Duh' },
  { letter: 'E', word: 'Elephant',   emoji: '🐘', phonics: 'Eh'  },
  { letter: 'F', word: 'Fish',       emoji: '🐟', phonics: 'Fuh' },
  { letter: 'G', word: 'Grapes',     emoji: '🍇', phonics: 'Guh' },
  { letter: 'H', word: 'Hat',        emoji: '🎩', phonics: 'Huh' },
  { letter: 'I', word: 'Ice Cream',  emoji: '🍦', phonics: 'Ih'  },
  { letter: 'J', word: 'Jellyfish',  emoji: '🪼', phonics: 'Juh' },
  { letter: 'K', word: 'Kite',       emoji: '🪁', phonics: 'Kuh' },
  { letter: 'L', word: 'Lion',       emoji: '🦁', phonics: 'Luh' },
  { letter: 'M', word: 'Monkey',     emoji: '🐒', phonics: 'Muh' },
  { letter: 'N', word: 'Nest',       emoji: '🪹', phonics: 'Nuh' },
  { letter: 'O', word: 'Orange',     emoji: '🍊', phonics: 'Oh'  },
  { letter: 'P', word: 'Pizza',      emoji: '🍕', phonics: 'Puh' },
  { letter: 'Q', word: 'Queen',      emoji: '👑', phonics: 'Kwuh'},
  { letter: 'R', word: 'Rainbow',    emoji: '🌈', phonics: 'Ruh' },
  { letter: 'S', word: 'Star',       emoji: '⭐', phonics: 'Suh' },
  { letter: 'T', word: 'Turtle',     emoji: '🐢', phonics: 'Tuh' },
  { letter: 'U', word: 'Umbrella',   emoji: '☂️',  phonics: 'Uh'  },
  { letter: 'V', word: 'Volcano',    emoji: '🌋', phonics: 'Vuh' },
  { letter: 'W', word: 'Whale',      emoji: '🐳', phonics: 'Wuh' },
  { letter: 'X', word: 'Xylophone',  emoji: '🎵', phonics: 'Ks'  },
  { letter: 'Y', word: 'Yak',        emoji: '🦬', phonics: 'Yuh' },
  { letter: 'Z', word: 'Zebra',      emoji: '🦓', phonics: 'Zuh' },
];

// ─── Export with colors assigned ─────────────────────────────────────────────

export const ALPHABET_DATA: LetterData[] = RAW.map((item, i) => ({
  ...item,
  color: COLORS[i % COLORS.length],
}));

// Handy lookup map: "A" → LetterData
export const LETTER_MAP: Record<string, LetterData> = Object.fromEntries(
  ALPHABET_DATA.map((d) => [d.letter, d])
);
