# 🌟 Alphabet Adventure

An interactive alphabet learning app for kids — built with **React + TypeScript + Tailwind CSS**.

---

## 📁 Project Structure

```
alphabet-app/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.node.json
├── tailwind.config.ts
├── postcss.config.js
│
└── src/
    ├── main.tsx                # ReactDOM entry
    ├── App.tsx                 # Shell: SideNav + content area + LearnMode portal
    ├── index.css               # Tailwind directives
    │
    ├── types/index.ts          # All shared TS types (LetterData, NavPage, …)
    ├── data/alphabetData.ts    # A–Z content (word, emoji, phonics, color)
    │
    ├── hooks/
    │   ├── useSound.ts         # Web Speech API / Audio()
    │   └── useActiveLetter.ts  # Active letter state
    │
    ├── components/
    │   ├── SideNav.tsx         # Left sidebar (desktop) + bottom bar (mobile)
    │   ├── HomePage.tsx        # Welcome screen with "Start Learning" CTA
    │   ├── LearnMode.tsx       # Fullscreen overlay + hold-to-exit button
    │   ├── AlphabetGrid.tsx    # A–Z grid
    │   ├── LetterCard.tsx      # Single tappable tile
    │   ├── LetterDisplay.tsx   # Emoji + phonics stage
    │   └── Header.tsx          # (legacy, kept for reuse)
    │
    └── assets/sounds/          # Drop MP3s here when ready
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

---

## 🔊 Sound System

Currently uses the **Web Speech API** — works in all modern browsers with zero assets.

To switch to real audio files:
1. Add MP3s to `src/assets/sounds/` (name them `a.mp3`, `b.mp3`, etc.)
2. Update `alphabetData.ts` to add `soundFile: '/sounds/a.mp3'` per letter
3. Uncomment the `Audio()` block in `useSound.ts`

---

## 🧩 Component Responsibilities

| Component | Role |
|---|---|
| `App.tsx` | State owner — passes handlers down |
| `Header` | Static title bar |
| `AlphabetGrid` | Lays out all 26 LetterCards |
| `LetterCard` | Single tappable tile with pop animation |
| `LetterDisplay` | Emoji + letter + phonics stage (animates on tap) |
| `useSound` | Speaks letter via Web Speech API |
| `useActiveLetter` | Tracks which letter is currently selected |
| `alphabetData.ts` | Single source of truth for all letter content |
| `types/index.ts` | All shared interfaces (no type duplication) |

---

## 🗺️ Next Steps (Planned)

- [ ] Real MP3 audio files per letter
- [ ] Background music toggle
- [ ] Letter quiz / game mode
- [ ] Progress tracking
- [ ] Confetti on letter tap
- [ ] Parent dashboard

---

## 🎨 Design Notes

- **Fonts**: Fredoka One (display) + Nunito (body) via Google Fonts
- **Colors**: 15-color rotating palette across A–Z tiles
- **Responsive grid**: 4 cols (mobile) → 6 cols (tablet) → 7 cols (desktop)
- **Animations**: Custom Tailwind keyframes — `bounce-in`, `pop`, `fade-up`, `wiggle`, `float`
