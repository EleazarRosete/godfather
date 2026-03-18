import { NavItem, NavPage, SideNavProps } from '../types';

const NAV_ITEMS: NavItem[] = [
  { id: 'home',      label: 'Home',      icon: '🏠', enabled: true  },
  { id: 'learn',     label: 'Learn',     icon: '📖', enabled: true  },
  { id: 'play',      label: 'Play',      icon: '🎮', enabled: false },
  { id: 'dashboard', label: 'Dashboard', icon: '📊', enabled: false },
  { id: 'profiles',  label: 'Profiles',  icon: '👤', enabled: false },
  { id: 'logout',    label: 'Logout',    icon: '🚪', enabled: false },
];

/**
 * SideNav
 *
 * Vertical pill-shaped sidebar on the left.
 * — Desktop: full labels + icons
 * — Mobile: icon-only collapsed bar at the bottom (landscape-safe)
 */
export function SideNav({ currentPage, onNavigate }: SideNavProps) {
  return (
    <>
      {/* ── Desktop / Tablet sidebar (left) ─────────────────────────────── */}
      <aside className="
        hidden sm:flex
        flex-col
        w-20 lg:w-52
        min-h-screen
        bg-white/10 backdrop-blur-md
        border-r border-white/20
        py-6 px-2 lg:px-4
        gap-2
        shrink-0
      ">
        {/* Logo */}
        <div className="flex flex-col items-center lg:items-start gap-1 mb-6 px-2">
          <span className="text-3xl">🌟</span>
          <span className="hidden lg:block font-display text-white text-lg leading-tight">
            Alphabet<br />Adventure
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={currentPage === item.id}
              onClick={() => item.enabled && onNavigate(item.id)}
            />
          ))}
        </nav>

        {/* Version badge */}
        <p className="hidden lg:block text-white/30 text-xs text-center mt-4 font-body">
          v1.0 · MVP
        </p>
      </aside>

      {/* ── Mobile bottom bar ────────────────────────────────────────────── */}
      <nav className="
        sm:hidden fixed bottom-0 left-0 right-0 z-40
        bg-indigo-900/90 backdrop-blur-md
        border-t border-white/20
        flex items-center justify-around
        px-2 py-2
        safe-area-inset-bottom
      ">
        {NAV_ITEMS.map((item) => (
          <MobileNavButton
            key={item.id}
            item={item}
            isActive={currentPage === item.id}
            onClick={() => item.enabled && onNavigate(item.id)}
          />
        ))}
      </nav>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavButton({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}) {
  const base = `
    flex items-center gap-3
    rounded-xl px-3 py-3
    cursor-pointer select-none
    transition-all duration-150
    font-body font-semibold text-sm
  `;

  const active   = 'bg-white text-indigo-700 shadow-md';
  const inactive = 'text-white/80 hover:bg-white/15';
  const disabled = 'opacity-35 cursor-not-allowed';

  return (
    <button
      onClick={onClick}
      disabled={!item.enabled}
      title={item.enabled ? item.label : `${item.label} — coming soon`}
      aria-label={item.label}
      className={[base, isActive ? active : inactive, !item.enabled ? disabled : ''].join(' ')}
    >
      <span className="text-xl shrink-0">{item.icon}</span>
      <span className="hidden lg:inline truncate">{item.label}</span>
      {!item.enabled && (
        <span className="hidden lg:inline ml-auto text-[10px] bg-white/20 text-white/60 rounded px-1 py-0.5 font-body">
          Soon
        </span>
      )}
    </button>
  );
}

function MobileNavButton({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!item.enabled}
      aria-label={item.label}
      className={[
        'flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all',
        isActive ? 'bg-white/20' : '',
        !item.enabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    >
      <span className="text-xl">{item.icon}</span>
      <span className={`text-[9px] font-body font-bold ${isActive ? 'text-white' : 'text-white/60'}`}>
        {item.label}
      </span>
    </button>
  );
}

export { NAV_ITEMS };
export type { NavPage };
