export interface LetterData {
  letter: string;
  word: string;
  emoji: string;
  phonics: string;
  color: string;
  soundFile?: string;
}

export interface ActiveLetter {
  data: LetterData;
  timestamp: number;
}

export type NavItem = {
  id: NavPage;
  label: string;
  icon: string;
  enabled: boolean;
};

export type NavPage = 'home' | 'learn' | 'play' | 'story' | 'song' | 'dashboard' | 'profiles' | 'logout' | 'report';

export interface LetterCardProps {
  data: LetterData;
  isActive: boolean;
  onClick: (data: LetterData) => void;
}

export interface LetterDisplayProps {
  active: ActiveLetter | null;
}

export interface AlphabetGridProps {
  activeLetter: string | null;
  onLetterClick: (data: LetterData) => void;
  allowedLetters?: string[];
}

export interface SideNavProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface LearnModeProps {
  onExit: () => void;
}

export interface HeaderProps {
  title?: string;
}