import { useState } from 'react';
import { NavPage } from './types';
import { SideNav } from './components/SideNav';
import { HomePage } from './components/HomePage';
import { LearnMode } from './components/LearnMode';

/**
 * App
 *
 * Shell layout:
 *   ┌──────────┬────────────────────────────────┐
 *   │ SideNav  │  Main content area             │
 *   │ (left)   │  (switches by currentPage)     │
 *   └──────────┴────────────────────────────────┘
 *
 * When user navigates to "learn", LearnMode mounts as a
 * fixed fullscreen overlay (portaled above everything).
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [learnOpen, setLearnOpen] = useState(false);

  function handleNavigate(page: NavPage) {
    if (page === 'learn') {
      setLearnOpen(true);
    } else {
      setCurrentPage(page);
    }
  }

  function handleLearnExit() {
    setLearnOpen(false);
  }

  return (
    <>
      {/* ── Shell ──────────────────────────────────────────────────────── */}
      <div className="
        flex min-h-screen
        bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700
      ">
        {/* Left sidebar */}
        <SideNav currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Main content */}
        <main className="
          flex-1 flex flex-col
          overflow-y-auto
          pb-16 sm:pb-0          /* room for mobile bottom nav */
        ">
          {currentPage === 'home' && (
            <HomePage onLearnClick={() => setLearnOpen(true)} />
          )}

          {/* Placeholder pages — flesh these out later */}
          {currentPage === 'dashboard' && <ComingSoon label="Dashboard 📊" />}
          {currentPage === 'play'      && <ComingSoon label="Play Mode 🎮" />}
          {currentPage === 'profiles'  && <ComingSoon label="Profiles 👤"  />}
          {currentPage === 'logout'    && <ComingSoon label="Logout 🚪"    />}
        </main>
      </div>

      {/* ── Fullscreen Learn overlay (portal above shell) ──────────────── */}
      {learnOpen && <LearnMode onExit={handleLearnExit} />}
    </>
  );
}

// ─── Placeholder for future pages ────────────────────────────────────────────
function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
      <p className="font-display text-white text-4xl drop-shadow">{label}</p>
      <p className="font-body text-white/70 text-lg">Coming soon! 🚧</p>
    </div>
  );
}
