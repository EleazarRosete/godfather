import { useCallback, useRef } from 'react';
import { LetterData } from '../types';

/**
 * useSound
 *
 * Speaks the letter using the Web Speech API (works everywhere, no assets needed).
 * When you add real MP3 files, swap to the Audio() path below — the hook interface
 * stays the same so no component changes are required.
 */
export function useSound() {
  const synthRef = useRef<SpeechSynthesis | null>(
    typeof window !== 'undefined' ? window.speechSynthesis : null
  );

  const speak = useCallback((data: LetterData) => {
    const synth = synthRef.current;
    if (!synth) return;

    // Cancel any in-progress speech
    synth.cancel();

    // ── Option A: Web Speech API (no audio files needed) ─────────────────────
    const utterance = new SpeechSynthesisUtterance(
      `${data.letter}… ${data.phonics}… ${data.letter} is for ${data.word}`
    );
    utterance.rate = 0.85;   // Slightly slower for kids
    utterance.pitch = 1.2;   // Slightly higher / friendlier
    utterance.volume = 1;
    synth.speak(utterance);

    // ── Option B: Real audio files (uncomment when you have assets) ───────────
    // if (data.soundFile) {
    //   const audio = new Audio(data.soundFile);
    //   audio.play().catch(console.warn);
    // }
  }, []);

  return { speak };
}
