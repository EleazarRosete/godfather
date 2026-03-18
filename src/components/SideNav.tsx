/**
 * SideNav — Pastel fuzzy navbar, Tailwind + custom CSS classes.
 * Width: w-nav (13rem). No mobile bottom bar.
 */

import { useEffect, useRef, useState } from 'react';
import { SideNavProps } from '../types';
import type { NavPage } from '../types';

const NAV_ITEMS = [
  { id: 'home'     as NavPage, label: 'Home',    theme: 'pink'   },
  { id: 'report'   as NavPage, label: 'Report',  theme: 'blue'   },
  { id: 'profiles' as NavPage, label: 'Profile', theme: 'yellow' },
  { id: 'logout'   as NavPage, label: 'Logout',  theme: 'peach'  },
];

/* ── Fuzzy SVG filter defs (hidden, referenced by CSS filter:url()) ── */
function FuzzyFilterDefs() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        {/* Background panel fuzzy filter */}
        <filter id="fuzzy-bg" x="-4%" y="-2%" width="108%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.055 0.04" numOctaves="5" seed="42" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Per-button fuzzy filters */}
        {[
          { id: 'fuzzy-home',    seed: 12 },
          { id: 'fuzzy-report',  seed: 18 },
          { id: 'fuzzy-profile', seed: 21 },
          { id: 'fuzzy-logout',  seed: 24 },
        ].map(f => (
          <filter key={f.id} id={f.id} x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="4" seed={f.seed} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feMorphology operator="dilate" radius="1.2" in="displaced" result="fat" />
            <feComposite in="displaced" in2="fat" operator="over" />
          </filter>
        ))}
      </defs>
    </svg>
  );
}

/* ── Pastel fuzzy background ─────────────────────────────────────── */
function NavBg() {
  return (
    /* Base gradient div — nav-bg is defined in index.css */
    <div className="nav-bg absolute inset-0 z-0">
      {/* Fuzzy SVG overlay that displaces the gradient edges */}
      <svg
        viewBox="0 0 208 900"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="navGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#d4eaff" />
            <stop offset="28%"  stopColor="#e8d8ff" />
            <stop offset="55%"  stopColor="#ffd8ef" />
            <stop offset="78%"  stopColor="#fff4c8" />
            <stop offset="100%" stopColor="#ffdfc8" />
          </linearGradient>
          <linearGradient id="navGloss" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
          <linearGradient id="navEdge" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="rgba(180,160,220,0)" />
            <stop offset="100%" stopColor="rgba(180,160,220,0.18)" />
          </linearGradient>
        </defs>

        {/* Main fill — fuzzy filter wobbles the edges */}
        <rect x="4" y="4" width="200" height="892" rx="18"
          fill="url(#navGrad)" filter="url(#fuzzy-bg)" />

        {/* Gloss sheen left half */}
        <rect x="4" y="4" width="100" height="892" rx="18"
          fill="url(#navGloss)" opacity="0.55" filter="url(#fuzzy-bg)" />

        {/* Right edge shadow */}
        <rect x="104" y="4" width="100" height="892" rx="18"
          fill="url(#navEdge)" filter="url(#fuzzy-bg)" />

        {/* Scattered soft depth dots */}
        {([
          [36,  90,  9, '#c8d8ff', 0.22],
          [148, 170, 7, '#f0c8ff', 0.20],
          [62,  280, 8, '#ffd0ea', 0.18],
          [158, 360, 6, '#fff0b0', 0.20],
          [44,  450, 9, '#c8f0ff', 0.17],
          [138, 530, 7, '#e8c8ff', 0.19],
          [68,  630, 8, '#ffc8d8', 0.17],
          [160, 710, 6, '#ffd8a0', 0.20],
          [40,  790, 9, '#d0e8ff', 0.17],
          [140, 860, 7, '#ffe8c0', 0.19],
        ] as [number,number,number,string,number][]).map(([cx, cy, r, fill, op], i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill={fill} opacity={op} filter="url(#fuzzy-bg)" />
        ))}
      </svg>
    </div>
  );
}

/* ── Child avatar ─────────────────────────────────────────────────── */
function AvatarCircle() {
  return (
    /* avatar-circle is defined in index.css */
    <div className="avatar-circle">
      <svg viewBox="0 0 60 60" width="58" height="58">
        <circle cx="30" cy="32" r="22" fill="#fddbb8" />
        <ellipse cx="30" cy="13" rx="14" ry="7" fill="#5a3a1a" />
        <path d="M16 17 Q11 8 18 11" stroke="#5a3a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M44 17 Q49 8 42 11" stroke="#5a3a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M30 10 Q28 3 30 6 Q32 3 30 10" stroke="#5a3a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="22" cy="30" r="4" fill="#fff" />
        <circle cx="38" cy="30" r="4" fill="#fff" />
        <circle cx="23" cy="31" r="2.5" fill="#2a1a0a" />
        <circle cx="39" cy="31" r="2.5" fill="#2a1a0a" />
        <circle cx="24" cy="29" r="1" fill="#fff" />
        <circle cx="40" cy="29" r="1" fill="#fff" />
        <path d="M18 25 Q22 22 26 25" stroke="#5a3a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M34 25 Q38 22 42 25" stroke="#5a3a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M29 36 Q30 39 31 36" stroke="#e09070" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M22 41 Q30 48 38 41" stroke="#d07858" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="18" cy="37" rx="5" ry="3.5" fill="#f4a0a0" opacity="0.5" />
        <ellipse cx="42" cy="37" rx="5" ry="3.5" fill="#f4a0a0" opacity="0.5" />
        <ellipse cx="8"  cy="33" rx="5" ry="7" fill="#fddbb8" />
        <ellipse cx="52" cy="33" rx="5" ry="7" fill="#fddbb8" />
        <ellipse cx="8"  cy="33" rx="3" ry="5" fill="#f4b090" />
        <ellipse cx="52" cy="33" rx="3" ry="5" fill="#f4b090" />
      </svg>
    </div>
  );
}

/* ── Background music hook ───────────────────────────────────────── */
function useBgm() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true); // always show Playing on load
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio('/sounds/homepagebgm.mp3');
    audio.loop = true;
    // ── Adjust max volume here (0.0 – 1.0) ──
    const targetVolume = 0.10;

    audio.volume = 0;
    // Fade in over 15 seconds
    const fadeSteps = 100;
    const fadeInterval = 15000 / fadeSteps;
    const step = targetVolume / fadeSteps;
    const fadeTimer = setInterval(() => {
      if (audio.volume + step >= targetVolume) {
        audio.volume = targetVolume;
        clearInterval(fadeTimer);
      } else {
        audio.volume = parseFloat((audio.volume + step).toFixed(4));
      }
    }, fadeInterval);
    audioRef.current = audio;

    // Try immediate autoplay
    audio.play()
      .then(() => { startedRef.current = true; setPlaying(true); })
      .catch(() => {
        // Browser blocked — wait for first interaction, start then
        // Keep button showing "Playing" so it looks active from the start
        function startOnInteraction() {
          if (startedRef.current) return;
          startedRef.current = true;
          audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
          document.removeEventListener('click', startOnInteraction);
          document.removeEventListener('touchstart', startOnInteraction);
          document.removeEventListener('keydown', startOnInteraction);
        }
        document.addEventListener('click', startOnInteraction);
        document.addEventListener('touchstart', startOnInteraction);
        document.addEventListener('keydown', startOnInteraction);
      });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  }

  return { playing, toggle };
}

/* ── Music play/pause button ─────────────────────────────────────── */
function MusicButton({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={playing ? 'Pause music' : 'Play music'}
      className="relative flex items-center justify-center gap-2 w-full rounded-full transition-all"
      style={{
        background: playing
          ? 'linear-gradient(135deg, #c4b8f0 0%, #a090d8 100%)'
          : 'rgba(255,255,255,0.35)',
        border: `2px solid ${playing ? '#9a80cc' : 'rgba(255,255,255,0.55)'}`,
        boxShadow: playing
          ? '0 4px 0 #7a60b0, 0 6px 14px rgba(120,90,200,0.28), inset 0 1px 0 rgba(255,255,255,0.4)'
          : '0 4px 0 rgba(180,160,220,0.4), inset 0 1px 0 rgba(255,255,255,0.6)',
        padding: '9px 14px',
        cursor: 'pointer',
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Gloss */}
      <div style={{
        position: 'absolute', top: 0, left: 6, right: 6, height: '40%',
        background: 'rgba(255,255,255,0.32)',
        borderRadius: '40px 40px 60% 60%',
        pointerEvents: 'none',
      }} />

      {/* Icon */}
      {playing ? (
        /* Pause icon — two vertical bars */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="4" height="12" rx="2" fill={playing ? '#fff' : '#9a80cc'} />
          <rect x="10" y="2" width="4" height="12" rx="2" fill={playing ? '#fff' : '#9a80cc'} />
        </svg>
      ) : (
        /* Play icon — triangle */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 2 L14 8 L4 14 Z" fill="#9a80cc" />
        </svg>
      )}

      <span style={{
        fontFamily: '"Fredoka One", cursive',
        fontSize: 12,
        color: playing ? '#fff' : '#7a60b0',
        letterSpacing: '0.04em',
        textShadow: playing ? '0 1px 3px rgba(0,0,0,0.18)' : 'none',
        position: 'relative',
      }}>
        {playing ? 'Playing' : 'Music'}
      </span>

      {/* Animated sound waves when playing */}
      {playing && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
          {[1, 1.4, 0.8].map((h, i) => (
            <div key={i} style={{
              width: 3,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.85)',
              animation: `musicBar 0.8s ${i * 0.15}s ease-in-out infinite alternate`,
              height: `${h * 8}px`,
            }} />
          ))}
        </div>
      )}
    </button>
  );
}

/* ── Single pill button ───────────────────────────────────────────── */
function PillButton({ label, theme, isActive, onClick }: {
  label: string; theme: string; isActive: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      /* pill-btn + pill-{theme} + is-active all come from index.css */
      className={`pill-btn pill-${theme}${isActive ? ' is-active' : ''}`}
    >
      {label}
    </button>
  );
}

/* ── Main SideNav — slide-in drawer ──────────────────────────────── */
export function SideNav({ currentPage, onNavigate, isOpen, onClose }: SideNavProps) {
  const { playing, toggle } = useBgm();
  return (
    <>
      {/* Backdrop — tap to close */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'rgba(60,40,100,0.22)',
          backdropFilter: isOpen ? 'blur(3px)' : 'blur(0px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, backdrop-filter 0.3s ease',
        }}
      />

      {/* Drawer panel */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '13rem',
          zIndex: 50,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.32s cubic-bezier(0.34,1.2,0.64,1)',
          overflow: 'hidden',
        }}
      >
        <FuzzyFilterDefs />
        <NavBg />

        <div className="relative z-20 flex flex-col items-center h-full px-4 pt-7 pb-5">
          {/* Avatar */}
          <div className="-mb-5 z-30">
            <AvatarCircle />
          </div>

          {/* Nav card */}
          <div className="nav-card w-full pt-8 px-3 pb-6 flex flex-col gap-4 mt-0">
            {/* Music play/pause — sits right below the avatar overlap */}
            <MusicButton playing={playing} onToggle={toggle} />

            {NAV_ITEMS.map(item => (
              <PillButton
                key={item.id}
                label={item.label}
                theme={item.theme}
                isActive={currentPage === item.id}
                onClick={() => onNavigate(item.id)}
              />
            ))}
          </div>

          <p className="font-body font-bold text-[9px] tracking-widest mt-auto" style={{ color: '#c0aa78' }}>
            v 1.0
          </p>
        </div>
      </aside>
    </>
  );
}

export { NAV_ITEMS };
export type { NavPage };