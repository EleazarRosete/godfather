import { useState } from 'react';
import { NavPage } from './types';
import { SideNav } from './components/SideNav';
import { HomePage } from './components/HomePage';
import { LearnMode } from './components/LearnMode';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [learnOpen, setLearnOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  function handleNavigate(page: NavPage) {
    setNavOpen(false);
    if (page === 'learn') { setLearnOpen(true); }
    else { setCurrentPage(page); }
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden relative" style={{ background: '#e8dfc4' }}>

        {/* ── Slide-in drawer nav ── */}
        <SideNav
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isOpen={navOpen}
          onClose={() => setNavOpen(false)}
        />

        {/* ── Nav toggle tab — always visible on the left edge ── */}
        {!learnOpen && (
          <button
            onClick={() => setNavOpen(o => !o)}
            aria-label="Toggle navigation"
            style={{
              position: 'fixed',
              left: navOpen ? 176 : 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 60,
              width: 28,
              height: 72,
              background: 'linear-gradient(180deg, #ddd4f8 0%, #c4b8f0 100%)',
              border: '2px solid rgba(255,255,255,0.6)',
              borderLeft: navOpen ? '2px solid rgba(255,255,255,0.6)' : 'none',
              borderRadius: navOpen ? '0 16px 16px 0' : '0 16px 16px 0',
              boxShadow: '3px 0 12px rgba(140,120,200,0.25)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'left 0.32s cubic-bezier(0.34,1.2,0.64,1)',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {/* Three line / chevron icon */}
            {navOpen ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2 L4 6 L8 10" stroke="#7a60c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <>
                <div style={{ width: 12, height: 2, borderRadius: 2, background: '#7a60c0' }} />
                <div style={{ width: 10, height: 2, borderRadius: 2, background: '#7a60c0' }} />
                <div style={{ width: 12, height: 2, borderRadius: 2, background: '#7a60c0' }} />
              </>
            )}
          </button>
        )}

        {/* ── Main content ── */}
        <main className="flex-1 h-screen overflow-hidden flex flex-col">
          {currentPage === 'home'     && (
            <HomePage
              onLearnClick={() => setLearnOpen(true)}
              onStoryClick={() => setCurrentPage('story')}
              onPlayClick={() => setCurrentPage('play')}
              onSongClick={() => setCurrentPage('song')}
            />
          )}
          {currentPage === 'story'    && <ComingSoon label="Piko Story"    emoji="📖" from="#c09af8" to="#7040d0" />}
          {currentPage === 'play'     && <ComingSoon label="Piko Play"     emoji="🎮" from="#6adc88" to="#28a04a" />}
          {currentPage === 'song'     && <ComingSoon label="Piko Song"     emoji="🎵" from="#ffcc44" to="#d07800" />}
          {currentPage === 'report'   && <ComingSoon label="My Report"     emoji="📊" from="#60c8f8" to="#2288c8" />}
          {currentPage === 'profiles' && <ComingSoon label="My Profile"    emoji="👤" from="#f5c842" to="#c89810" />}
          {currentPage === 'logout'   && <ComingSoon label="See you soon!" emoji="👋" from="#ffd4b0" to="#e89860" />}
        </main>
      </div>

      {learnOpen && <LearnMode onExit={() => setLearnOpen(false)} />}
    </>
  );
}

function ComingSoon({ label, emoji, from, to }: { label: string; emoji: string; from: string; to: string }) {
  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center gap-6"
      style={{ background: `linear-gradient(145deg, ${from} 0%, ${to} 100%)` }}
    >
      <span style={{ fontSize: 90, filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.25))', animation: 'pikoFloat 3s ease-in-out infinite' }}>{emoji}</span>
      <p style={{ fontFamily: '"Fredoka One", cursive', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', textShadow: '0 3px 10px rgba(0,0,0,0.25)', margin: 0 }}>
        {label}
      </p>
      <div className="px-6 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.28)', fontFamily: '"Nunito", sans-serif', fontWeight: 800, fontSize: '1rem', color: '#fff', letterSpacing: '0.1em' }}>
        Coming Soon 🚧
      </div>
    </div>
  );
}