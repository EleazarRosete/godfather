import { HeaderProps } from '../types';

/**
 * Header
 * Simple top bar with app title and a fun subtitle.
 */
export function Header({ title = 'Alphabet Adventure' }: HeaderProps) {
  return (
    <header className="w-full py-4 px-6 flex flex-col items-center gap-1">
      <h1 className="font-display text-4xl md:text-5xl text-white drop-shadow-md tracking-wide">
        {title} 🌟
      </h1>
      <p className="font-body text-white/80 text-sm md:text-base font-semibold">
        Tap a letter to hear it!
      </p>
    </header>
  );
}
