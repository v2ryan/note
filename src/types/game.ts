export interface PianoKey {
  note: string;
  frequency: number;
  isPressed: boolean;
}

export interface PianoProps {
  onKeyPress: (note: string) => void;
  highlightedKeys: string[];
  disabled: boolean;
}

export type GameLevel = 3 | 6 | 8 | 12;
export type GamePhase = 'idle' | 'playing' | 'input' | 'success' | 'failure' | 'gameOver';

export interface GameState {
  currentLevel: GameLevel;
  currentSequence: string[];
  userSequence: string[];
  score: number;
  highScore: number;
  lives: number;
  isPlayingSequence: boolean;
  gamePhase: GamePhase;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: number;
  unlocked: boolean;
  unlockedDate?: Date;
}

export interface StoredGameData {
  highScore: number;
  totalGamesPlayed: number;
  achievements: Achievement[];
  unlockedAudioSnippets: string[];
  lastPlayedLevel: GameLevel;
}

export interface GameStats {
  totalGamesPlayed: number;
  highestSequenceAchieved: number;
  accuracyPercentage: number;
  favoriteLevel: GameLevel;
}