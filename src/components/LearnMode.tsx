import { useState, useEffect, useRef } from 'react';
import { LearnModeProps, LetterData } from '../types';
import { ALPHABET_DATA } from '../data/alphabetData';
import { LearnModeFilter, filterLetters, Filter } from './LearnModeFilter';
import { LetterFlipCard } from './LetterFlipCard';

export function LearnMode({ onExit }: LearnModeProps) {
  const [filter, setFilter]       = useState<Filter | null>(null);
  const [index, setIndex]         = useState(0);
  const [swipeDx, setSwipeDx]     = useState(0);
  const [transitioning, setTrans] = useState(false);
  const touchStartX               = useRef<number | null>(null);

  const allLetters = ALPHABET_DATA.map(d => d.letter);
  const visible    = filter ? filterLetters(filter, allLetters) : [];

  const currentData: LetterData | undefined = visible[index]
    ? ALPHABET_DATA.find(d => d.letter === visible[index])
    : undefined;

  // ── Fullscreen + orientation ─────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.requestFullscreen?.().catch(() => {});
    try {
      (screen.orientation as any).lock?.('landscape').catch(() => {});
    } catch (_) {}
    return () => {
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
      try { (screen.orientation as any).unlock?.(); } catch (_) {}
    };
  }, []);

  useEffect(() => { setIndex(0); }, [filter]);

  // ── Speak ────────────────────────────────────────────────────────────────
  function speakLetterAndWord(letter: string, word: string) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(`${letter}… ${word}`);
    u.rate = 0.8;
    u.pitch = 1.2;
    synth.speak(u);
  }

  // ── Navigation ───────────────────────────────────────────────────────────
  function goTo(newIndex: number) {
    if (transitioning) return;
    const clamped = Math.max(0, Math.min(visible.length - 1, newIndex));
    if (clamped === index) return;
    setTrans(true);
    setTimeout(() => { setIndex(clamped); setTrans(false); }, 250);
  }

  // ── Swipe ────────────────────────────────────────────────────────────────
  function onTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function onTouchMove(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    setSwipeDx(e.touches[0].clientX - touchStartX.current);
  }
  function onTouchEnd() {
    if (Math.abs(swipeDx) > 60) goTo(swipeDx < 0 ? index + 1 : index - 1);
    setSwipeDx(0);
    touchStartX.current = null;
  }

  // ── Keyboard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') goTo(index + 1);
      if (e.key === 'ArrowLeft')  goTo(index - 1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, visible.length]);

  function dataFor(letter: string): LetterData {
    return ALPHABET_DATA.find(d => d.letter === letter)!;
  }

  const filterMeta: Record<Filter, { label: string; emoji: string; gradient: string }> = {
    vowels:     { label: 'Vowels',     emoji: '🅰️', gradient: 'from-pink-500 to-rose-500'     },
    consonants: { label: 'Consonants', emoji: '🔡', gradient: 'from-violet-500 to-purple-600'  },
    alphabet:   { label: 'All A–Z',   emoji: '🔤', gradient: 'from-sky-500 to-blue-600'       },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #f472b6, transparent)', filter: 'blur(40px)' }}/>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent)', filter: 'blur(50px)' }}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #34d399, transparent)', filter: 'blur(60px)' }}/>
      </div>

      {/* Hold-to-exit */}
      <HoldToExitButton onExit={onExit} />

      {/* ════════════ SELECTION SCREEN ════════════ */}
      {filter === null ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-8 px-6 relative z-10">
          <div className="text-center">
            <div className="text-5xl mb-3">🌟</div>
            <h2 className="font-display text-white text-4xl sm:text-5xl drop-shadow-lg mb-2">
              Let's Learn!
            </h2>
            <p className="font-body text-white/60 text-base">Pick what you want to explore today</p>
          </div>
          <LearnModeFilter active="alphabet" onChange={f => setFilter(f)} selectionMode={true} />
        </div>

      ) : (
      /* ════════════ CARD SCREEN ════════════ */
        <div className="flex flex-col flex-1 overflow-hidden relative z-10">

          {/* ── Top bar ── */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 pt-3 pb-1">

            {/* Current filter badge */}
            <div className={`
              flex items-center gap-2 px-4 py-2 rounded-2xl
              bg-gradient-to-r ${filterMeta[filter].gradient}
              shadow-lg
            `}
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            >
              <span className="text-xl">{filterMeta[filter].emoji}</span>
              <span className="font-display text-white text-base">{filterMeta[filter].label}</span>
            </div>

            {/* Back button — big + colorful */}
            <button
              onClick={() => setFilter(null)}
              className="
                flex items-center gap-2
                px-5 py-3 rounded-2xl
                font-display text-white text-base
                transition-all duration-150
                hover:scale-105 active:scale-95
              "
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                boxShadow: '0 4px 20px rgba(239,68,68,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <span className="text-xl">🏠</span>
              <span>Pick Again!</span>
            </button>
          </div>

          {/* ── Letter strip ── */}
          <div className="flex-shrink-0 px-4 py-2">
            <div
              className="flex gap-2 justify-center flex-wrap px-2 py-2 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}
            >
              {visible.map((letter, i) => {
                const d = dataFor(letter);
                const isActive = i === index;
                return (
                  <button
                    key={letter}
                    onClick={() => goTo(i)}
                    className={`
                      font-display text-sm w-9 h-9 rounded-xl transition-all duration-200
                      ${isActive
                        ? 'text-white scale-125 shadow-lg'
                        : 'text-white/70 hover:text-white hover:scale-110'
                      }
                    `}
                    style={isActive ? {
                      background: `linear-gradient(135deg, white, #e0e7ff)`,
                      color: '#3730a3',
                      boxShadow: '0 4px 15px rgba(255,255,255,0.4)',
                    } : {
                      background: 'rgba(255,255,255,0.1)',
                    }}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Card + arrows ── */}
          <div
            className="flex-1 flex items-center justify-center px-3 py-2 gap-3"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Left arrow */}
            <button
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: index === 0 ? 'none' : '0 6px 25px rgba(99,102,241,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
                fontSize: '2.5rem',
                color: 'white',
              }}
            >
              ←
            </button>

            {/* Flip card */}
            <div
              className="flex-1 h-full max-w-lg"
              style={{
                opacity: transitioning ? 0 : 1,
                transform: `translateX(${swipeDx * 0.12}px) rotate(${swipeDx * 0.01}deg)`,
                transition: transitioning ? 'opacity 0.25s' : 'transform 0.1s',
                minHeight: '260px',
                maxHeight: '340px',
              }}
            >
              {currentData && (
                <LetterFlipCard
                  key={currentData.letter}
                  data={currentData}
                  onSpeak={speakLetterAndWord}
                />
              )}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => goTo(index + 1)}
              disabled={index === visible.length - 1}
              className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                boxShadow: index === visible.length - 1 ? 'none' : '0 6px 25px rgba(236,72,153,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
                fontSize: '2.5rem',
                color: 'white',
              }}
            >
              →
            </button>
          </div>

          {/* ── Progress dots ── */}
          <div className="flex-shrink-0 flex gap-1.5 justify-center pb-4 pt-1">
            {visible.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === index ? '2rem' : '0.6rem',
                  height: '0.6rem',
                  background: i === index
                    ? 'linear-gradient(90deg, #f472b6, #818cf8)'
                    : 'rgba(255,255,255,0.25)',
                  boxShadow: i === index ? '0 0 10px rgba(244,114,182,0.6)' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Hold-to-Exit ─────────────────────────────────────────────────────────────
const HOLD_MS = 1200;

function HoldToExitButton({ onExit }: { onExit: () => void }) {
  const [holding, setHolding]   = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef  = useRef<ReturnType<typeof setTimeout>  | null>(null);

  function startHold() {
    setHolding(true);
    const t0 = Date.now();
    intervalRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - t0) / HOLD_MS) * 100, 100));
    }, 16);
    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current!);
      onExit();
    }, HOLD_MS);
  }

  function cancelHold() {
    setHolding(false);
    setProgress(0);
    clearInterval(intervalRef.current!);
    clearTimeout(timeoutRef.current!);
  }

  return (
    <button
      onMouseDown={startHold} onMouseUp={cancelHold} onMouseLeave={cancelHold}
      onTouchStart={e => { e.preventDefault(); startHold(); }}
      onTouchEnd={cancelHold} onTouchCancel={cancelHold}
      aria-label="Hold to exit"
      className={`
        absolute top-3 left-3 z-60 w-10 h-10 rounded-full
        flex items-center justify-center transition-all select-none touch-none
        ${holding ? 'scale-110' : ''}
      `}
      style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" className="absolute inset-0">
        <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5"/>
        <circle cx="20" cy="20" r="17" fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeOpacity={holding ? 1 : 0}
          strokeWidth="2.5"
          strokeDasharray={`${2 * Math.PI * 17}`}
          strokeDashoffset={`${2 * Math.PI * 17 * (1 - progress / 100)}`}
          strokeLinecap="round"
          transform="rotate(-90 20 20)"
          style={{ transition: 'stroke-dashoffset 0.016s linear' }}
        />
      </svg>
      <span className="text-white/30 text-xs font-bold relative z-10">✕</span>
    </button>
  );
}