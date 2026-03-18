/**
 * HomePage
 *
 * The landing "dashboard" view shown on first load.
 * Gives a friendly welcome and nudges users toward Learn.
 */
export function HomePage({ onLearnClick }: { onLearnClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center">
      {/* Hero emoji */}
      <div className="text-8xl animate-float" aria-hidden="true">🌟</div>

      <div className="flex flex-col gap-2">
        <h2 className="font-display text-white text-4xl md:text-5xl drop-shadow">
          Welcome!
        </h2>
        <p className="font-body text-white/80 text-base md:text-lg font-semibold max-w-sm">
          Tap letters, hear sounds, and discover new words — let's learn the alphabet!
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={onLearnClick}
        className="
          font-display text-indigo-700 text-xl md:text-2xl
          bg-white hover:bg-yellow-100
          px-8 py-4 rounded-2xl shadow-xl
          transition-transform hover:scale-105 active:scale-95
          animate-bounce-in
        "
      >
        📖 Start Learning!
      </button>

      {/* Coming soon badges */}
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {['🎮 Play Mode', '📊 Dashboard', '👤 Profiles'].map((label) => (
          <span
            key={label}
            className="font-body text-white/50 text-xs bg-white/10 rounded-full px-3 py-1"
          >
            {label} — coming soon
          </span>
        ))}
      </div>
    </div>
  );
}
