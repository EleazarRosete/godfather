/**
 * Piko — Home Page
 * Cards use SVG feTurbulence displacement for scribbled, hand-drawn edges
 * that "accidentally" go outside the lines — same effect as nav buttons.
 */
import { useEffect, useState } from 'react';

interface HomePageProps {
  onLearnClick: () => void;
  onStoryClick?: () => void;
  onPlayClick?: () => void;
  onSongClick?: () => void;
}

/* ─────────────────────────────────────────────────────
   CARD CONFIG — colors, seeds, gradients
   ───────────────────────────────────────────────────── */
const CARD_CONFIGS = {
  learn: {
    filterId:   'scribble-learn',
    seed:       7,
    // Pastel sky blue — matches pill-blue
    gradFrom:   '#e0f4ff',
    gradMid:    '#b8e4fc',
    gradTo:     '#9ad4f8',
    shadow:     '#72b8e8',
    shadowAlt:  '#4a98c8',
    stroke:     'rgba(255,255,255,0.85)',
    bleedColor: '#fff0a8',   // butter yellow bleeds out
    bleedColor2:'#ffc2d1',   // rose pink bleeds out
  },
  play: {
    filterId:   'scribble-play',
    seed:       13,
    // Pastel mint green
    gradFrom:   '#e0fce8',
    gradMid:    '#b8f4c4',
    gradTo:     '#8eeaa0',
    shadow:     '#5acc78',
    shadowAlt:  '#3aac58',
    stroke:     'rgba(255,255,255,0.85)',
    bleedColor: '#ffc2d1',   // pink bleeds out
    bleedColor2:'#fff0a8',   // yellow bleeds out
  },
  story: {
    filterId:   'scribble-story',
    seed:       19,
    // Pastel lavender — matches pill-pink hue family
    gradFrom:   '#f0e8ff',
    gradMid:    '#ddd4ff',
    gradTo:     '#c4b8f8',
    shadow:     '#a090e0',
    shadowAlt:  '#8070c0',
    stroke:     'rgba(255,255,255,0.85)',
    bleedColor: '#ffd4b0',   // peach bleeds out
    bleedColor2:'#b8f4c4',   // mint bleeds out
  },
  song: {
    filterId:   'scribble-song',
    seed:       23,
    // Pastel butter yellow — matches pill-yellow
    gradFrom:   '#fffbe0',
    gradMid:    '#fff0a8',
    gradTo:     '#ffe87a',
    shadow:     '#e8cc50',
    shadowAlt:  '#c8a830',
    stroke:     'rgba(255,255,255,0.85)',
    bleedColor: '#b8e4fc',   // blue bleeds out
    bleedColor2:'#ddd4ff',   // lavender bleeds out
  },
};

type CardKey = keyof typeof CARD_CONFIGS;

/* ─────────────────────────────────────────────────────
   HIDDEN SVG FILTER DEFS
   One set of defs injected once at the top of the page.
   Each card gets its own unique turbulence seed so their
   scribble shapes all look different.
   ───────────────────────────────────────────────────── */
function ScribbleFilterDefs() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
      <defs>
        {(Object.entries(CARD_CONFIGS) as [CardKey, typeof CARD_CONFIGS[CardKey]][]).map(([, cfg]) => (
          <filter
            key={cfg.filterId}
            id={cfg.filterId}
            x="-12%" y="-12%"
            width="124%" height="124%"
            colorInterpolationFilters="sRGB"
          >
            {/* Step 1: fractal noise drives the displacement */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.028 0.032"
              numOctaves="5"
              seed={cfg.seed}
              result="noise"
            />
            {/* Step 2: warp the source graphic edges */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
              result="warped"
            />
            {/* Step 3: dilate a little so color bleeds OUTSIDE the border */}
            <feMorphology
              operator="dilate"
              radius="3"
              in="warped"
              result="bloated"
            />
            {/* Step 4: composite warped on top of bloated for hairy bleed */}
            <feComposite in="warped" in2="bloated" operator="over" />
          </filter>
        ))}

        {/* Gradient defs for each card */}
        {(Object.entries(CARD_CONFIGS) as [CardKey, typeof CARD_CONFIGS[CardKey]][]).map(([key, cfg]) => (
          <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={cfg.gradFrom} />
            <stop offset="50%"  stopColor={cfg.gradMid}  />
            <stop offset="100%" stopColor={cfg.gradTo}   />
          </linearGradient>
        ))}

        {/* Gloss gradient shared */}
        <linearGradient id="card-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.50)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   FLOATING SPARKLE
   ───────────────────────────────────────────────────── */
function Sparkle({ x, y, size, color, delay, duration }: {
  x: number; y: number; size: number; color: string; delay: number; duration: number;
}) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${x}%`, top: `${y}%`,
        fontSize: size, color,
        animation: `pikoFloat ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        zIndex: 1, opacity: 0.7,
      }}
    >✦</div>
  );
}

/* ─────────────────────────────────────────────────────
   CARD ILLUSTRATIONS (unchanged from before)
   ───────────────────────────────────────────────────── */
function LearnIllustration() {
  return (
    <svg viewBox="0 0 140 110" width="75%" style={{ maxWidth: 120 }} xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="18" width="44" height="58" rx="5" fill="#fff" opacity="0.95" />
      <rect x="74" y="18" width="44" height="58" rx="5" fill="#f0f8ff" opacity="0.95" />
      <rect x="64" y="16" width="12" height="62" rx="4" fill="#b8d8f8" />
      {[30,40,50,60,68].map((y, i) => (
        <rect key={i} x="30" y={y} width={i%2===0?28:20} height="3" rx="2" fill="#b8d4f0" opacity="0.7" />
      ))}
      <text x="96" y="58" textAnchor="middle" fontSize="22" fill="#ffd93d">⭐</text>
      <text x="96" y="45" textAnchor="middle" fontSize="18" fill="#38a8e8" fontFamily="Fredoka One,cursive" fontWeight="bold">A</text>
      <text x="18"  y="14" fontSize="13" fill="#fff" opacity="0.9" fontFamily="Fredoka One,cursive">A</text>
      <text x="60"  y="8"  fontSize="13" fill="#fff" opacity="0.9" fontFamily="Fredoka One,cursive">B</text>
      <text x="104" y="10" fontSize="13" fill="#fff" opacity="0.9" fontFamily="Fredoka One,cursive">C</text>
      <rect x="108" y="52" width="8" height="26" rx="3" fill="#ffd93d" transform="rotate(25,112,65)" />
      <polygon points="108,76 116,76 112,86" fill="#f4a0a0" transform="rotate(25,112,65)" />
    </svg>
  );
}

function PlayIllustration() {
  return (
    <svg viewBox="0 0 140 110" width="75%" style={{ maxWidth: 120 }} xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="34" width="84" height="50" rx="24" fill="#fff" opacity="0.95" />
      <rect x="44" y="50" width="8" height="20" rx="3" fill="#b8f4c0" />
      <rect x="38" y="56" width="20" height="8"  rx="3" fill="#b8f4c0" />
      <circle cx="94" cy="52" r="6" fill="#ffc2d1" />
      <circle cx="106" cy="58" r="6" fill="#b8e4fc" />
      <circle cx="94"  cy="64" r="6" fill="#fff0a8" />
      <circle cx="82"  cy="58" r="6" fill="#c0f4c8" />
      <text x="94"  y="56" textAnchor="middle" fontSize="7" fill="#8a3a52" fontFamily="Fredoka One,cursive">A</text>
      <text x="106" y="62" textAnchor="middle" fontSize="7" fill="#2a5a82" fontFamily="Fredoka One,cursive">B</text>
      <text x="94"  y="68" textAnchor="middle" fontSize="7" fill="#7a5e10" fontFamily="Fredoka One,cursive">X</text>
      <text x="82"  y="62" textAnchor="middle" fontSize="7" fill="#1a6a32" fontFamily="Fredoka One,cursive">Y</text>
      <rect x="62" y="55" width="8" height="4" rx="2" fill="#aad4aa" />
      <rect x="72" y="55" width="8" height="4" rx="2" fill="#aad4aa" />
      <text x="20"  y="22" fontSize="16" opacity="0.85">⭐</text>
      <text x="110" y="18" fontSize="14" opacity="0.85">🌟</text>
      <text x="62"  y="12" fontSize="12" opacity="0.80">✨</text>
    </svg>
  );
}

function StoryIllustration() {
  return (
    <svg viewBox="0 0 140 110" width="75%" style={{ maxWidth: 120 }} xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="12" width="80" height="72" rx="10" fill="#fff" opacity="0.95" />
      <rect x="30" y="12" width="80" height="22" rx="10" fill="#e4d4ff" opacity="0.95" />
      <rect x="30" y="26" width="80" height="8"  rx="0"  fill="#e4d4ff" opacity="0.95" />
      <text x="70" y="27" textAnchor="middle" fontSize="12" fill="#a070f0">✦ ✦ ✦</text>
      <circle cx="70" cy="56" r="14" fill="#fff8e0" />
      <circle cx="77" cy="50" r="10" fill="#e4d4ff" />
      <path d="M62 56 Q66 44 76 48 Q68 40 60 50 Z" fill="#ffd93d" />
      <circle cx="88" cy="50" r="2"   fill="#ffd93d" />
      <circle cx="84" cy="44" r="1.5" fill="#ffd93d" />
      <circle cx="56" cy="48" r="1.5" fill="#c0b0ff" />
      <ellipse cx="70" cy="68" rx="7" ry="9" fill="#f0ece4" />
      <ellipse cx="67" cy="56" rx="3" ry="6" fill="#f0ece4" />
      <ellipse cx="73" cy="56" rx="3" ry="6" fill="#f0ece4" />
      <circle  cx="70" cy="66" r="5"  fill="#f0ece4" />
      <text x="16"  y="20" fontSize="14" opacity="0.8">🌙</text>
      <text x="112" y="16" fontSize="12" opacity="0.8">⭐</text>
      <text x="108" y="44" fontSize="10" opacity="0.7">✨</text>
    </svg>
  );
}

function SongIllustration() {
  return (
    <svg viewBox="0 0 140 110" width="75%" style={{ maxWidth: 120 }} xmlns="http://www.w3.org/2000/svg">
      <text x="22"  y="44" fontSize="26" fill="#fff" opacity="0.9">♪</text>
      <text x="92"  y="30" fontSize="20" fill="#fff" opacity="0.85">♫</text>
      <text x="110" y="62" fontSize="16" fill="#fff" opacity="0.80">♩</text>
      <text x="16"  y="70" fontSize="14" fill="#fff" opacity="0.75">♬</text>
      <rect x="44" y="32" width="52" height="48" rx="12" fill="#fff" opacity="0.95" />
      <circle cx="70" cy="54" r="18" fill="#ffe8a0" />
      <circle cx="70" cy="54" r="12" fill="#ffcc44" />
      <circle cx="70" cy="54" r="5"  fill="#ffa820" />
      <circle cx="53" cy="70" r="4"  fill="#ffc2d1" />
      <circle cx="70" cy="72" r="4"  fill="#b8e4fc" />
      <circle cx="87" cy="70" r="4"  fill="#c0f4c8" />
      <line x1="70" y1="32" x2="70" y2="14" stroke="#ffa820" strokeWidth="3" strokeLinecap="round" />
      <circle cx="70" cy="12" r="4" fill="#ffd93d" />
      <path d="M30 46 Q24 54 30 62" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M23 40 Q13 54 23 68" stroke="#fff" strokeWidth="2"   fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M110 46 Q116 54 110 62" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M117 40 Q127 54 117 68" stroke="#fff" strokeWidth="2"   fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

const ILLUSTRATIONS: Record<CardKey, () => JSX.Element> = {
  learn: LearnIllustration,
  play:  PlayIllustration,
  story: StoryIllustration,
  song:  SongIllustration,
};

const LABELS: Record<CardKey, string> = {
  learn: 'Learn',
  play:  'Play',
  story: 'Story',
  song:  'Song',
};

/* ─────────────────────────────────────────────────────
   SCRIBBLE CARD
   The entire card is drawn as an SVG rect with the
   feTurbulence filter applied — so both the fill AND
   the border get displaced, making edges look hand-drawn.
   An extra "bleed" layer sits BEHIND the card rect,
   rendered in a contrasting pastel — this is the color
   that visibly spills outside the scribbled line.
   ───────────────────────────────────────────────────── */
function ScribbleCard({
  cardKey,
  onClick,
  delay,
  bobDelay,
}: {
  cardKey: CardKey;
  onClick: () => void;
  delay: number;
  bobDelay: number;
}) {
  const cfg = CARD_CONFIGS[cardKey];
  const Illustration = ILLUSTRATIONS[cardKey];
  const label = LABELS[cardKey];
  const [pressed, setPressed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [shining, setShining] = useState(false);
  // Track whether the entrance animation has finished — after that we only bob
  const [entered, setEntered] = useState(false);

  function handleMouseEnter() {
    setHovering(true);
    setShining(false);
    requestAnimationFrame(() => setShining(true));
  }
  function handleMouseLeave() {
    setHovering(false);
    setShining(false);
  }

  // bleed padding in px — how far the scribble spills outside the card edge
  const BLEED = 14;

  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => { setPressed(false); handleMouseLeave(); }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative focus:outline-none"
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        margin: BLEED,
        width: `calc(100% - ${BLEED * 2}px)`,
        height: `calc(100% - ${BLEED * 2}px)`,
        // bob/entrance animation lives here — never changes on hover
        animation: entered
          ? `pikoCardBob 4s ${bobDelay}s ease-in-out infinite`
          : `pikoCardIn 0.6s ${delay}s cubic-bezier(0.34,1.56,0.64,1) forwards`,
      }}
      onAnimationEnd={() => { if (!entered) setEntered(true); }}
    >
      {/* Inner wrapper handles hover/press transform independently from the bob animation */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transform: pressed
            ? 'translateY(5px) scale(0.96)'
            : hovering
            ? 'translateY(-10px) scale(1.03)'
            : 'translateY(0) scale(1)',
          transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
      {/*
        SVG layer: absolutely positioned, expanded by BLEED on all sides
        so it renders outside the button boundary (the overflow is visible).
        The SVG viewBox maps 1:1 to pixels including the bleed zone.
        W = 100% + 2*BLEED, H = 100% + 2*BLEED, offset by -BLEED/-BLEED.
        We use a percentage-based viewBox trick: render into a 200×240 space
        but let the SVG stretch to fill its container with preserveAspectRatio="none".
      */}
      <svg
        viewBox={`${-BLEED} ${-BLEED} ${200 + BLEED * 2} ${240 + BLEED * 2}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          left: -BLEED,
          top: -BLEED,
          width: `calc(100% + ${BLEED * 2}px)`,
          height: `calc(100% + ${BLEED * 2}px)`,
          display: 'block',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <filter id={`shadow-${cardKey}`} x="-25%" y="-25%" width="150%" height="170%">
            <feDropShadow
              dx="0"
              dy={pressed ? 2 : 8}
              stdDeviation={pressed ? 4 : 10}
              floodColor={cfg.shadow}
              floodOpacity="0.45"
            />
          </filter>
        </defs>

        {/* Drop shadow rect — clean, outside scribble filter */}
        <rect x="0" y="0" width="200" height="240" rx="28"
          fill="transparent"
          filter={`url(#shadow-${cardKey})`}
        />

        {/* Everything in this group gets the scribble/hairy filter */}
        <g filter={`url(#${cfg.filterId})`}>

          {/* Bleed rects — larger than card, sit behind, poke out when displaced */}
          <rect x={-BLEED + 2} y={-BLEED + 2} width={200 + (BLEED - 2) * 2} height={240 + (BLEED - 2) * 2}
            rx="36" fill={cfg.bleedColor} opacity="0.6" />
          <rect x={-BLEED + 6} y={-BLEED + 4} width={200 + (BLEED - 6) * 2} height={240 + (BLEED - 4) * 2}
            rx="40" fill={cfg.bleedColor2} opacity="0.35" />

          {/* Corner blobs */}
          <ellipse cx="6"   cy="6"   rx="20" ry="16" fill={cfg.bleedColor}  opacity="0.45" />
          <ellipse cx="194" cy="8"   rx="18" ry="14" fill={cfg.bleedColor2} opacity="0.38" />
          <ellipse cx="6"   cy="234" rx="16" ry="18" fill={cfg.bleedColor2} opacity="0.40" />
          <ellipse cx="194" cy="232" rx="18" ry="16" fill={cfg.bleedColor}  opacity="0.35" />

          {/* Main card fill — exactly covers the full 200×240 area */}
          <rect x="0" y="0" width="200" height="240" rx="28"
            fill={`url(#grad-${cardKey})`} />

          {/* Thick white crayon border stroke */}
          <rect x="0" y="0" width="200" height="240" rx="28"
            fill="none"
            stroke="rgba(255,255,255,0.78)"
            strokeWidth="7" />

          {/* Gloss top-half sheen */}
          <rect x="5" y="3" width="190" height="115" rx="24"
            fill="url(#card-gloss)" />

        </g>
      </svg>

      {/*
        Content layer: absolutely fills the button (0→100%), sits above the SVG.
        This ensures text, illustration, badge render AT the correct card size.
      */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.9rem 0.8rem 1.1rem',
          pointerEvents: 'none',
        }}
      >
        {/* PIKO badge */}
        <div style={{
          background: 'rgba(255,255,255,0.35)',
          borderRadius: 999,
          padding: '3px 14px',
          fontFamily: '"Fredoka One", cursive',
          fontSize: 11,
          color: '#fff',
          letterSpacing: '0.2em',
          textShadow: '0 1px 2px rgba(0,0,0,0.15)',
        }}>
          PIKO
        </div>

        {/* Illustration — constrained so it never overflows the card */}
        <div style={{ flex: 1, width: '100%', maxHeight: '55%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px 0' }}>
          <Illustration />
        </div>

        {/* Label + tap hint */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <span style={{
            fontFamily: '"Fredoka One", cursive',
            fontSize: 'clamp(1.2rem, 2.2vw, 1.7rem)',
            color: '#fff',
            textShadow: '0 3px 6px rgba(0,0,0,0.20)',
            letterSpacing: '0.03em',
          }}>
            {label}
          </span>
          <span style={{
            fontFamily: '"Nunito", sans-serif',
            fontWeight: 800,
            fontSize: '0.62rem',
            color: 'rgba(255,255,255,0.80)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            Tap to Start
          </span>
        </div>
      </div>

      {/* Shine sweep on hover */}
      {shining && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          borderRadius: '1.75rem',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            width: '55%',
            background: 'linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)',
            transform: 'skewX(-15deg)',
            animation: 'pikoShine 0.55s ease forwards',
          }} />
        </div>
      )}
      </div>
    </button>
  );
}


/* ─────────────────────────────────────────────────────
   MAIN HOME PAGE
   ───────────────────────────────────────────────────── */
export function HomePage({ onLearnClick, onStoryClick, onPlayClick, onSongClick }: HomePageProps) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  const sparkles = [
    { x: 4,  y: 7,  size: 18, color: '#ffd93d', delay: 0,   duration: 2.8 },
    { x: 91, y: 5,  size: 14, color: '#f4a8ff', delay: 0.6, duration: 3.2 },
    { x: 2,  y: 52, size: 12, color: '#a8f4ff', delay: 1.1, duration: 2.5 },
    { x: 94, y: 50, size: 16, color: '#ffc2d1', delay: 0.3, duration: 3.0 },
    { x: 48, y: 2,  size: 11, color: '#c8f0ff', delay: 1.5, duration: 2.7 },
    { x: 7,  y: 87, size: 13, color: '#b8f4c0', delay: 0.8, duration: 3.4 },
    { x: 88, y: 84, size: 11, color: '#ffd4b0', delay: 1.8, duration: 2.6 },
    { x: 50, y: 93, size: 15, color: '#e4d4ff', delay: 0.4, duration: 3.1 },
  ];

  const cards: { cardKey: CardKey; onClick: () => void; delay: number; bobDelay: number }[] = [
    { cardKey: 'learn', onClick: onLearnClick,             delay: 0.10, bobDelay: 0.0 },
    { cardKey: 'play',  onClick: onPlayClick  ?? (() => {}), delay: 0.20, bobDelay: 0.9 },
    { cardKey: 'story', onClick: onStoryClick ?? (() => {}), delay: 0.30, bobDelay: 1.7 },
    { cardKey: 'song',  onClick: onSongClick  ?? (() => {}), delay: 0.40, bobDelay: 2.5 },
  ];

  return (
    <div className="piko-bg relative flex flex-col w-full overflow-hidden" style={{ height: '100vh' }}>

      {/* Hidden SVG filter defs */}
      <ScribbleFilterDefs />

      {/* Sparkles */}
      {sparkles.map((s, i) => <Sparkle key={i} {...s} />)}

      {/* Radial center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,255,255,0.42) 0%, transparent 80%)',
          zIndex: 0,
        }}
      />

      {/* ── Header ── */}
      <header
        className="relative z-10 flex flex-col items-center justify-center shrink-0"
        style={{ paddingTop: '2vh', paddingBottom: '1.4vh' }}
      >
        <div
          className="piko-logo flex items-center gap-1"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(-18px)',
            transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <span style={{ color: '#ff6b9d' }}>P</span>
          <span style={{ color: '#ffd93d' }}>i</span>
          <span style={{ color: '#44c46a' }}>k</span>
          <span style={{ color: '#60c8f8' }}>o</span>
        </div>
        <p
          className="piko-tagline"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s 0.15s ease, transform 0.5s 0.15s ease',
          }}
        >
          Learn · Play · Grow
        </p>
      </header>

      {/* ── 2×2 card grid ── */}
      <main
        className="relative z-10 flex-1 grid grid-cols-2 grid-rows-2 gap-3 px-4 pb-4"
        style={{ minHeight: 0 }}
      >
        {cards.map(c => (
          <ScribbleCard key={c.cardKey} {...c} />
        ))}
      </main>
    </div>
  );
}