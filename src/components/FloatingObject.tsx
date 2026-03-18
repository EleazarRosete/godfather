/**
 * FloatingObject
 *
 * CSS-drawn, realistic-looking object for each letter.
 * Floats gently and rotates on hover / when active.
 * No external images — pure CSS + SVG inline art.
 */

const OBJECTS: Record<string, () => JSX.Element> = {
  A: Apple,
  B: Ball,
  C: Cat,
  D: Dog,
  E: Elephant,
  F: Fish,
  G: Grapes,
  H: Hat,
  I: IceCream,
  J: Jellyfish,
  K: Kite,
  L: Lion,
  M: Moon,
  N: Nest,
  O: Orange,
  P: Pizza,
  Q: Queen,
  R: Rainbow,
  S: Star,
  T: Tree,
  U: Umbrella,
  V: Volcano,
  W: Whale,
  X: Xylophone,
  Y: Yarn,
  Z: Zebra,
};

export function FloatingObject({ letter, rotating }: { letter: string; rotating?: boolean }) {
  const Component = OBJECTS[letter] ?? Fallback;
  return (
    <div
      className={`
        flex items-center justify-center w-full h-full
        transition-transform duration-700
        ${rotating ? 'animate-spin-slow' : 'animate-float'}
      `}
      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.18))' }}
    >
      <Component />
    </div>
  );
}

// ─── Individual object SVGs ────────────────────────────────────────────────────

function Apple() {
  return (
    <svg viewBox="0 0 120 130" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <path d="M62 18 Q68 8 72 4" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Leaf */}
      <ellipse cx="70" cy="10" rx="10" ry="6" fill="#4CAF50" transform="rotate(-30 70 10)"/>
      {/* Body */}
      <path d="M30 45 Q20 30 35 22 Q50 14 60 28 Q70 14 85 22 Q100 30 90 45 Q105 65 95 85 Q85 105 60 108 Q35 105 25 85 Q15 65 30 45Z"
        fill="#E53935"/>
      {/* Shine */}
      <ellipse cx="45" cy="48" rx="10" ry="16" fill="rgba(255,255,255,0.25)" transform="rotate(-20 45 48)"/>
      {/* Shadow base */}
      <ellipse cx="60" cy="112" rx="22" ry="5" fill="rgba(0,0,0,0.12)"/>
    </svg>
  );
}

function Ball() {
  return (
    <svg viewBox="0 0 120 120" width="130" height="130" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="52" fill="#E53935"/>
      <path d="M60 8 Q85 35 85 60 Q85 85 60 112" stroke="white" strokeWidth="3" fill="none"/>
      <path d="M8 60 Q35 35 60 35 Q85 35 112 60" stroke="white" strokeWidth="3" fill="none"/>
      <path d="M8 60 Q35 85 60 85 Q85 85 112 60" stroke="white" strokeWidth="3" fill="none"/>
      <ellipse cx="44" cy="40" rx="10" ry="7" fill="rgba(255,255,255,0.2)" transform="rotate(-30 44 40)"/>
      <ellipse cx="60" cy="116" rx="22" ry="5" fill="rgba(0,0,0,0.12)"/>
    </svg>
  );
}

function Cat() {
  return (
    <svg viewBox="0 0 120 130" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <polygon points="25,45 15,15 42,35" fill="#FF8A65"/>
      <polygon points="95,45 105,15 78,35" fill="#FF8A65"/>
      <polygon points="27,43 20,22 40,36" fill="#FFCCBC"/>
      <polygon points="93,43 100,22 80,36" fill="#FFCCBC"/>
      {/* Head */}
      <ellipse cx="60" cy="65" rx="42" ry="40" fill="#FF8A65"/>
      {/* Eyes */}
      <ellipse cx="44" cy="58" rx="8" ry="9" fill="#1A237E"/>
      <ellipse cx="76" cy="58" rx="8" ry="9" fill="#1A237E"/>
      <circle cx="46" cy="56" r="3" fill="white"/>
      <circle cx="78" cy="56" r="3" fill="white"/>
      {/* Nose */}
      <ellipse cx="60" cy="72" rx="5" ry="4" fill="#E91E63"/>
      {/* Mouth */}
      <path d="M55 76 Q60 82 65 76" stroke="#E91E63" strokeWidth="2" fill="none"/>
      {/* Whiskers */}
      <line x1="20" y1="70" x2="50" y2="73" stroke="#5D4037" strokeWidth="1.5"/>
      <line x1="20" y1="76" x2="50" y2="76" stroke="#5D4037" strokeWidth="1.5"/>
      <line x1="70" y1="73" x2="100" y2="70" stroke="#5D4037" strokeWidth="1.5"/>
      <line x1="70" y1="76" x2="100" y2="76" stroke="#5D4037" strokeWidth="1.5"/>
      <ellipse cx="60" cy="108" rx="22" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Dog() {
  return (
    <svg viewBox="0 0 130 130" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
      {/* Floppy ears */}
      <ellipse cx="28" cy="58" rx="18" ry="28" fill="#8D6E63" transform="rotate(15 28 58)"/>
      <ellipse cx="102" cy="58" rx="18" ry="28" fill="#8D6E63" transform="rotate(-15 102 58)"/>
      {/* Head */}
      <ellipse cx="65" cy="62" rx="42" ry="40" fill="#BCAAA4"/>
      {/* Snout */}
      <ellipse cx="65" cy="78" rx="22" ry="16" fill="#D7CCC8"/>
      {/* Eyes */}
      <circle cx="50" cy="57" r="8" fill="#3E2723"/>
      <circle cx="80" cy="57" r="8" fill="#3E2723"/>
      <circle cx="52" cy="55" r="3" fill="white"/>
      <circle cx="82" cy="55" r="3" fill="white"/>
      {/* Nose */}
      <ellipse cx="65" cy="72" rx="8" ry="6" fill="#212121"/>
      <circle cx="63" cy="71" r="2" fill="rgba(255,255,255,0.4)"/>
      {/* Mouth */}
      <path d="M58 80 Q65 87 72 80" stroke="#8D6E63" strokeWidth="2" fill="none"/>
      <ellipse cx="65" cy="112" rx="22" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Elephant() {
  return (
    <svg viewBox="0 0 130 130" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="65" cy="65" rx="48" ry="44" fill="#90A4AE"/>
      {/* Ears */}
      <ellipse cx="18" cy="62" rx="18" ry="26" fill="#78909C"/>
      <ellipse cx="112" cy="62" rx="18" ry="26" fill="#78909C"/>
      {/* Trunk */}
      <path d="M52 88 Q40 105 48 120 Q55 128 60 118 Q55 108 60 96" fill="#90A4AE" stroke="#78909C" strokeWidth="1"/>
      {/* Eyes */}
      <circle cx="50" cy="56" r="7" fill="#1A237E"/>
      <circle cx="80" cy="56" r="7" fill="#1A237E"/>
      <circle cx="52" cy="54" r="2.5" fill="white"/>
      <circle cx="82" cy="54" r="2.5" fill="white"/>
      {/* Tusks */}
      <path d="M55 82 Q45 92 50 100" stroke="ivory" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="65" cy="116" rx="24" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Fish() {
  return (
    <svg viewBox="0 0 140 100" width="150" height="110" xmlns="http://www.w3.org/2000/svg">
      {/* Tail */}
      <polygon points="15,20 15,80 50,50" fill="#FF7043"/>
      {/* Body */}
      <ellipse cx="90" cy="50" rx="55" ry="35" fill="#FF5722"/>
      {/* Fin top */}
      <path d="M75 18 Q90 5 105 18" fill="#FF8A65"/>
      {/* Eye */}
      <circle cx="118" cy="44" r="10" fill="white"/>
      <circle cx="120" cy="44" r="6" fill="#1A237E"/>
      <circle cx="122" cy="42" r="2" fill="white"/>
      {/* Scales */}
      <path d="M55 35 Q65 28 75 35" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none"/>
      <path d="M70 45 Q80 38 90 45" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none"/>
      <path d="M55 55 Q65 48 75 55" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none"/>
      {/* Mouth */}
      <path d="M130 52 Q135 50 130 48" stroke="#BF360C" strokeWidth="2" fill="none"/>
    </svg>
  );
}

function Grapes() {
  return (
    <svg viewBox="0 0 120 130" width="130" height="140" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 10 Q70 5 65 18" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="67" cy="12" rx="9" ry="5" fill="#388E3C" transform="rotate(-20 67 12)"/>
      {[
        [60, 40], [42, 52], [78, 52],
        [32, 65], [60, 65], [88, 65],
        [42, 80], [78, 80],
        [60, 94],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="16" fill="#7B1FA2"/>
          <circle cx={cx! - 4} cy={cy! - 4} r="5" fill="rgba(255,255,255,0.25)"/>
        </g>
      ))}
      <ellipse cx="60" cy="115" rx="24" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Hat() {
  return (
    <svg viewBox="0 0 140 120" width="150" height="130" xmlns="http://www.w3.org/2000/svg">
      {/* Brim */}
      <ellipse cx="70" cy="88" rx="60" ry="14" fill="#1A237E"/>
      {/* Crown */}
      <rect x="30" y="20" width="80" height="70" rx="8" fill="#283593"/>
      {/* Band */}
      <rect x="28" y="72" width="84" height="12" rx="4" fill="#E53935"/>
      {/* Shine */}
      <ellipse cx="50" cy="38" rx="12" ry="20" fill="rgba(255,255,255,0.08)" transform="rotate(-10 50 38)"/>
      <ellipse cx="70" cy="106" rx="28" ry="5" fill="rgba(0,0,0,0.12)"/>
    </svg>
  );
}

function IceCream() {
  return (
    <svg viewBox="0 0 100 140" width="110" height="150" xmlns="http://www.w3.org/2000/svg">
      {/* Cone */}
      <polygon points="50,130 20,70 80,70" fill="#FFCC80"/>
      <line x1="35" y1="90" x2="50" y2="130" stroke="#FFB300" strokeWidth="1.5"/>
      <line x1="50" y1="70" x2="50" y2="130" stroke="#FFB300" strokeWidth="1.5"/>
      <line x1="65" y1="90" x2="50" y2="130" stroke="#FFB300" strokeWidth="1.5"/>
      {/* Scoop */}
      <circle cx="50" cy="56" r="30" fill="#F48FB1"/>
      {/* Second scoop */}
      <circle cx="50" cy="34" r="22" fill="#CE93D8"/>
      {/* Shine */}
      <circle cx="43" cy="27" r="6" fill="rgba(255,255,255,0.3)"/>
      {/* Sprinkles */}
      {[[38,48,15],[62,52,-20],[55,44,30],[45,60,-10]].map(([x,y,rot],i)=>(
        <rect key={i} x={x} y={y} width="8" height="3" rx="1.5"
          fill={['#E53935','#43A047','#1E88E5','#FB8C00'][i]}
          transform={`rotate(${rot} ${x+4} ${y+1.5})`}/>
      ))}
      <ellipse cx="50" cy="133" rx="18" ry="4" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Jellyfish() {
  return (
    <svg viewBox="0 0 120 150" width="130" height="160" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="50" rx="48" ry="42" fill="rgba(186,104,200,0.85)"/>
      <ellipse cx="60" cy="56" rx="36" ry="28" fill="rgba(225,190,231,0.5)"/>
      {[30,42,55,68,78,90].map((x, i) => (
        <path key={i} d={`M${x} 88 Q${x-6+i*2} ${108+i*4} ${x+2} ${125+i*3}`}
          stroke="rgba(186,104,200,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      ))}
      <circle cx="46" cy="46" r="5" fill="rgba(255,255,255,0.4)"/>
      <circle cx="72" cy="42" r="4" fill="rgba(255,255,255,0.3)"/>
    </svg>
  );
}

function Kite() {
  return (
    <svg viewBox="0 0 120 140" width="130" height="150" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,5 110,60 60,100 10,60" fill="#E53935"/>
      <polygon points="60,5 110,60 60,52" fill="#FFEB3B"/>
      <polygon points="10,60 60,52 60,100" fill="#42A5F5"/>
      <line x1="60" y1="5" x2="60" y2="100" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
      <line x1="10" y1="60" x2="110" y2="60" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
      {/* Tail */}
      <path d="M60 100 Q50 112 58 122 Q66 132 58 140" stroke="#FF9800" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {[108,120,132].map((y,i)=>(
        <ellipse key={i} cx={58+(i%2===0?4:-4)} cy={y} rx="5" ry="3"
          fill={['#E91E63','#9C27B0','#FF9800'][i]} transform={`rotate(${i*20} ${58} ${y})`}/>
      ))}
    </svg>
  );
}

function Lion() {
  return (
    <svg viewBox="0 0 130 130" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
      {/* Mane */}
      {Array.from({length: 12}).map((_,i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = 65 + Math.cos(angle) * 50;
        const y = 65 + Math.sin(angle) * 50;
        return <circle key={i} cx={x} cy={y} r="14" fill="#E65100"/>;
      })}
      {/* Head */}
      <circle cx="65" cy="65" r="38" fill="#FFA726"/>
      {/* Eyes */}
      <circle cx="52" cy="58" r="7" fill="#1A237E"/>
      <circle cx="78" cy="58" r="7" fill="#1A237E"/>
      <circle cx="54" cy="56" r="2.5" fill="white"/>
      <circle cx="80" cy="56" r="2.5" fill="white"/>
      {/* Snout */}
      <ellipse cx="65" cy="75" rx="18" ry="12" fill="#FFB74D"/>
      {/* Nose */}
      <ellipse cx="65" cy="70" rx="5" ry="4" fill="#E91E63"/>
      <path d="M60 74 Q65 80 70 74" stroke="#E91E63" strokeWidth="2" fill="none"/>
      <ellipse cx="65" cy="112" rx="22" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 120 120" width="130" height="130" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 20 Q110 50 95 85 Q80 115 50 108 Q20 100 18 70 Q16 40 40 25 Q55 17 65 20 Q50 35 52 58 Q54 82 72 90 Q92 98 100 78 Q108 58 95 42 Q87 30 80 20Z" fill="#FDD835"/>
      <circle cx="42" cy="55" r="6" fill="rgba(255,255,255,0.3)"/>
      <circle cx="60" cy="80" r="4" fill="rgba(255,255,255,0.2)"/>
      <circle cx="52" cy="35" r="3" fill="rgba(255,255,255,0.25)"/>
    </svg>
  );
}

function Nest() {
  return (
    <svg viewBox="0 0 130 110" width="140" height="120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="65" cy="82" rx="52" ry="22" fill="#8D6E63"/>
      <path d="M20 82 Q30 55 65 50 Q100 55 110 82" fill="#A1887F"/>
      {[[-8,0],[0,-8],[8,0]].map(([dx,dy],i)=>(
        <ellipse key={i} cx={65+dx*3} cy={68+dy} rx="14" ry="12"
          fill={['#81D4FA','#A5D6A7','#FFF176'][i]}/>
      ))}
      {/* Twigs */}
      {[['M15 85 Q35 70 55 78'],['M115 85 Q95 70 75 78'],['M30 90 Q50 78 70 82']].map((d,i)=>(
        <path key={i} d={d[0]} stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round"/>
      ))}
    </svg>
  );
}

function Orange() {
  return (
    <svg viewBox="0 0 120 125" width="130" height="135" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 12 Q66 5 64 18" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="66" cy="13" rx="9" ry="5" fill="#388E3C" transform="rotate(-15 66 13)"/>
      <circle cx="60" cy="68" r="50" fill="#FF8F00"/>
      {/* Segments */}
      {[0,45,90,135,180,225,270,315].map((deg,i)=>(
        <line key={i} x1="60" y1="68"
          x2={60+Math.cos(deg*Math.PI/180)*48}
          y2={68+Math.sin(deg*Math.PI/180)*48}
          stroke="#E65100" strokeWidth="1.2" strokeOpacity="0.4"/>
      ))}
      <circle cx="60" cy="68" r="8" fill="#FF6F00" opacity="0.6"/>
      <ellipse cx="45" cy="48" rx="10" ry="14" fill="rgba(255,255,255,0.18)" transform="rotate(-20 45 48)"/>
      <ellipse cx="60" cy="118" rx="22" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Pizza() {
  return (
    <svg viewBox="0 0 120 120" width="130" height="130" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 110,100 10,100" fill="#FF8F00"/>
      <polygon points="60,25 100,95 20,95" fill="#E53935"/>
      {/* Cheese blobs */}
      {[[50,55],[72,60],[58,78],[40,75],[76,80]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="9" fill="#FDD835" opacity="0.9"/>
      ))}
      {/* Pepperoni */}
      {[[56,45],[70,70],[45,65]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="6" fill="#B71C1C"/>
      ))}
      {/* Crust */}
      <path d="M10 100 Q60 115 110 100" stroke="#FFB74D" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <ellipse cx="60" cy="112" rx="28" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Queen() {
  return (
    <svg viewBox="0 0 120 130" width="130" height="140" xmlns="http://www.w3.org/2000/svg">
      {/* Crown */}
      <polygon points="10,70 10,30 30,50 60,10 90,50 110,30 110,70" fill="#FDD835"/>
      <rect x="10" y="68" width="100" height="18" rx="4" fill="#FFB300"/>
      {/* Gems */}
      {[[60,15,'#E53935'],[30,48,'#42A5F5'],[90,48,'#66BB6A'],[20,72,'#E53935'],[60,72,'#9C27B0'],[100,72,'#E53935']].map(([cx,cy,fill],i)=>(
        <circle key={i} cx={cx as number} cy={cy as number} r="7" fill={fill as string}/>
      ))}
      {/* Shine on gems */}
      {[[60,12],[30,45],[90,45]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx+2} cy={cy-2} r="2" fill="rgba(255,255,255,0.6)"/>
      ))}
      <ellipse cx="60" cy="112" rx="24" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Rainbow() {
  return (
    <svg viewBox="0 0 140 90" width="150" height="100" xmlns="http://www.w3.org/2000/svg">
      {[
        ['#E53935', 65],
        ['#FF9800', 57],
        ['#FFEB3B', 49],
        ['#4CAF50', 41],
        ['#2196F3', 33],
        ['#9C27B0', 25],
      ].map(([color, r], i) => (
        <path key={i}
          d={`M ${70-(r as number)} 80 A ${r} ${r} 0 0 1 ${70+(r as number)} 80`}
          stroke={color as string} strokeWidth="8" fill="none"/>
      ))}
      {/* Clouds */}
      {[[10,72],[120,72]].map(([cx,cy],i)=>(
        <g key={i}>
          <circle cx={cx} cy={cy} r="14" fill="white"/>
          <circle cx={cx+14} cy={cy-4} r="12" fill="white"/>
          <circle cx={cx+28} cy={cy} r="14" fill="white"/>
        </g>
      ))}
    </svg>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 120 120" width="130" height="130" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="60,8 74,45 114,45 82,68 94,106 60,84 26,106 38,68 6,45 46,45"
        fill="#FDD835"
        stroke="#F9A825"
        strokeWidth="2"
      />
      <polygon
        points="60,22 70,48 98,48 76,64 84,90 60,74 36,90 44,64 22,48 50,48"
        fill="#FFEE58"
        opacity="0.5"
      />
      <ellipse cx="48" cy="40" rx="8" ry="12" fill="rgba(255,255,255,0.25)" transform="rotate(-25 48 40)"/>
      <ellipse cx="60" cy="114" rx="22" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Tree() {
  return (
    <svg viewBox="0 0 120 140" width="130" height="150" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="100" width="20" height="35" rx="4" fill="#795548"/>
      <polygon points="60,10 100,65 75,60 95,90 25,90 45,60 20,65" fill="#388E3C"/>
      <polygon points="60,10 90,58 60,52 30,58" fill="#43A047"/>
      <circle cx="44" cy="45" r="5" fill="#E53935" opacity="0.8"/>
      <circle cx="72" cy="58" r="5" fill="#FFEB3B" opacity="0.8"/>
      <circle cx="56" cy="72" r="5" fill="#E53935" opacity="0.8"/>
      <ellipse cx="60" cy="135" rx="22" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Umbrella() {
  return (
    <svg viewBox="0 0 120 140" width="130" height="150" xmlns="http://www.w3.org/2000/svg">
      {/* Canopy */}
      <path d="M10 60 Q60 5 110 60 Q85 50 60 55 Q35 50 10 60Z" fill="#E53935"/>
      {[10,35,60,85].map((x,i)=>(
        <path key={i} d={`M${x+12} 60 Q${x+18} 52 ${x+24} 60`} fill="#C62828"/>
      ))}
      {/* Handle */}
      <line x1="60" y1="60" x2="60" y2="120" stroke="#1A237E" strokeWidth="4" strokeLinecap="round"/>
      <path d="M60 120 Q60 136 48 136 Q36 136 36 124" stroke="#1A237E" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {/* Tip */}
      <circle cx="60" cy="60" r="4" fill="#1A237E"/>
    </svg>
  );
}

function Volcano() {
  return (
    <svg viewBox="0 0 140 130" width="150" height="140" xmlns="http://www.w3.org/2000/svg">
      <polygon points="70,15 120,110 20,110" fill="#78909C"/>
      <polygon points="70,15 95,70 45,70" fill="#546E7A"/>
      {/* Lava */}
      <path d="M55 68 Q58 55 62 45 Q65 38 70 15 Q75 38 78 45 Q82 55 85 68Z" fill="#FF5722"/>
      <path d="M58 68 Q64 58 70 48 Q76 58 82 68Z" fill="#FF8F00"/>
      {/* Smoke */}
      <circle cx="62" cy="8" r="8" fill="rgba(200,200,200,0.5)"/>
      <circle cx="72" cy="4" r="10" fill="rgba(180,180,180,0.4)"/>
      <circle cx="58" cy="0" r="7" fill="rgba(160,160,160,0.3)"/>
      <ellipse cx="70" cy="114" rx="30" ry="6" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Whale() {
  return (
    <svg viewBox="0 0 160 120" width="170" height="130" xmlns="http://www.w3.org/2000/svg">
      {/* Tail */}
      <path d="M15 55 Q5 30 25 42 Q15 20 35 48" fill="#1565C0"/>
      {/* Body */}
      <ellipse cx="100" cy="65" rx="68" ry="42" fill="#1976D2"/>
      {/* Belly */}
      <ellipse cx="105" cy="75" rx="45" ry="22" fill="#90CAF9"/>
      {/* Fin */}
      <path d="M80 25 Q95 8 110 25" fill="#1565C0"/>
      {/* Eye */}
      <circle cx="148" cy="58" r="10" fill="white"/>
      <circle cx="150" cy="58" r="6" fill="#1A237E"/>
      <circle cx="152" cy="56" r="2" fill="white"/>
      {/* Mouth */}
      <path d="M152 68 Q155 64 158 68" stroke="#0D47A1" strokeWidth="2" fill="none"/>
      {/* Spout */}
      <path d="M110 24 Q105 10 108 2 Q112 10 118 5 Q114 14 118 24" fill="#90CAF9" opacity="0.8"/>
    </svg>
  );
}

function Xylophone() {
  return (
    <svg viewBox="0 0 140 110" width="150" height="120" xmlns="http://www.w3.org/2000/svg">
      {/* Frame */}
      <line x1="20" y1="20" x2="35" y2="100" stroke="#5D4037" strokeWidth="5" strokeLinecap="round"/>
      <line x1="120" y1="20" x2="105" y2="100" stroke="#5D4037" strokeWidth="5" strokeLinecap="round"/>
      {/* Bars */}
      {[
        ['#E53935', 22, 118, 22],
        ['#FF9800', 27, 113, 36],
        ['#FFEB3B', 32, 108, 50],
        ['#4CAF50', 37, 103, 64],
        ['#2196F3', 42, 98,  78],
        ['#9C27B0', 47, 93,  92],
      ].map(([color, y1, x2, y2], i) => (
        <line key={i} x1="22" y1={y1 as number} x2={x2 as number} y2={y2 as number}
          stroke={color as string} strokeWidth="11" strokeLinecap="round"/>
      ))}
      {/* Mallets */}
      <line x1="48" y1="18" x2="65" y2="50" stroke="#795548" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="65" cy="52" r="7" fill="#795548"/>
      <line x1="92" y1="18" x2="75" y2="50" stroke="#795548" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="75" cy="52" r="7" fill="#795548"/>
    </svg>
  );
}

function Yarn() {
  return (
    <svg viewBox="0 0 120 120" width="130" height="130" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="48" fill="#E91E63"/>
      {/* Yarn lines */}
      {[
        "M20 40 Q60 25 100 40",
        "M15 60 Q60 45 105 60",
        "M20 80 Q60 65 100 80",
        "M35 25 Q50 60 35 95",
        "M60 18 Q60 60 60 102",
        "M85 25 Q70 60 85 95",
      ].map((d, i) => (
        <path key={i} d={d} stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" fill="none"/>
      ))}
      <circle cx="42" cy="42" r="10" fill="rgba(255,255,255,0.15)"/>
      <ellipse cx="60" cy="112" rx="22" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Zebra() {
  return (
    <svg viewBox="0 0 130 130" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <ellipse cx="32" cy="35" rx="12" ry="18" fill="#BDBDBD" transform="rotate(-15 32 35)"/>
      <ellipse cx="98" cy="35" rx="12" ry="18" fill="#BDBDBD" transform="rotate(15 98 35)"/>
      {/* Head */}
      <ellipse cx="65" cy="72" rx="44" ry="42" fill="white"/>
      {/* Stripes */}
      {[
        "M30 55 Q45 50 55 60",
        "M28 68 Q42 63 52 73",
        "M72 60 Q82 50 98 55",
        "M73 73 Q83 63 100 68",
        "M42 88 Q55 82 68 88",
      ].map((d, i) => (
        <path key={i} d={d} stroke="#212121" strokeWidth="5" fill="none" strokeLinecap="round"/>
      ))}
      {/* Snout */}
      <ellipse cx="65" cy="90" rx="22" ry="15" fill="#E0E0E0"/>
      {/* Eyes */}
      <circle cx="46" cy="63" r="8" fill="#1A237E"/>
      <circle cx="84" cy="63" r="8" fill="#1A237E"/>
      <circle cx="48" cy="61" r="3" fill="white"/>
      <circle cx="86" cy="61" r="3" fill="white"/>
      {/* Nose */}
      <ellipse cx="58" cy="88" r="4" fill="#9E9E9E"/>
      <ellipse cx="72" cy="88" r="4" fill="#9E9E9E"/>
      <path d="M58 93 Q65 99 72 93" stroke="#9E9E9E" strokeWidth="2" fill="none"/>
      {/* Mane */}
      {[45,52,60,68,75].map((x,i)=>(
        <ellipse key={i} cx={x} cy={28+i%2*4} rx="5" ry="10" fill="#212121"/>
      ))}
      <ellipse cx="65" cy="114" rx="24" ry="5" fill="rgba(0,0,0,0.10)"/>
    </svg>
  );
}

function Fallback() {
  return (
    <svg viewBox="0 0 100 100" width="110" height="110" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#E0E0E0"/>
      <text x="50" y="58" textAnchor="middle" fontSize="36" fill="#9E9E9E">?</text>
    </svg>
  );
}   