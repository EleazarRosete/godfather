import { useState, useCallback } from 'react';
import { ActiveLetter, LetterData } from '../types';

/**
 * useActiveLetter
 *
 * Tracks the currently selected letter.
 * Re-stamping `timestamp` lets the display component re-animate
 * even when the same letter is tapped twice in a row.
 */
export function useActiveLetter() {
  const [activeLetter, setActiveLetter] = useState<ActiveLetter | null>(null);

  const setActive = useCallback((data: LetterData) => {
    setActiveLetter({ data, timestamp: Date.now() });
  }, []);

  const clearActive = useCallback(() => {
    setActiveLetter(null);
  }, []);

  return { activeLetter, setActive, clearActive };
}
