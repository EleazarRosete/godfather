type Filter = 'alphabet' | 'vowels' | 'consonants';

export function LearnModeFilter({
  active,
  onChange,
  selectionMode = false,
}: {
  active: Filter;
  onChange: (f: Filter) => void;
  selectionMode?: boolean;
}) {
  const options: { id: Filter; label: string; emoji: string; color: string; desc: string }[] = [
    { id: 'vowels',     label: 'Vowels',     emoji: '🅰️', color: 'from-pink-400 to-rose-500',    desc: 'A E I O U'    },
    { id: 'consonants', label: 'Consonants', emoji: '🔡', color: 'from-violet-400 to-purple-600', desc: 'B C D F G …'  },
    { id: 'alphabet',   label: 'All A–Z',   emoji: '🔤', color: 'from-sky-400 to-blue-600',      desc: 'Every letter' },
  ];

  return (
    <div className={`flex ${selectionMode ? 'gap-6 sm:gap-10' : 'gap-2'} justify-center items-center px-4 py-4 flex-wrap`}>
      {options.map((opt, i) => {
        const isActive = active === opt.id;
        const delay = ['0s', '0.3s', '0.6s'][i];
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            style={selectionMode ? { animationDelay: delay } : undefined}
            className={`
              relative flex flex-col items-center justify-center
              ${selectionMode
                ? 'w-32 h-32 sm:w-40 sm:h-40 gap-2 rounded-3xl animate-float'
                : 'px-4 py-2 rounded-full gap-1'
              }
              bg-gradient-to-br ${opt.color}
              shadow-xl select-none cursor-pointer
              transition-all duration-300
              ${isActive && !selectionMode ? 'ring-4 ring-white scale-105 shadow-md' : ''}
              ${selectionMode ? 'hover:scale-105 active:scale-95' : 'opacity-90 hover:opacity-100'}
            `}
          >
            <span className={selectionMode ? 'text-4xl' : 'text-base'}>{opt.emoji}</span>
            <span className={`font-display text-white drop-shadow ${selectionMode ? 'text-lg' : 'text-sm'}`}>
              {opt.label}
            </span>
            {selectionMode && (
              <span className="font-body text-white/70 text-xs">{opt.desc}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function filterLetters(filter: Filter, allLetters: string[]): string[] {
  const VOWELS = ['A', 'E', 'I', 'O', 'U'];
  if (filter === 'vowels')     return allLetters.filter(l => VOWELS.includes(l));
  if (filter === 'consonants') return allLetters.filter(l => !VOWELS.includes(l));
  return allLetters;
}

export type { Filter };