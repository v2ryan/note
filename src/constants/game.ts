import { Achievement } from '../types/game';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_sequence',
    name: 'First Success',
    description: 'Complete your first sequence',
    requirement: 1,
    unlocked: false
  },
  {
    id: 'sequence_master_10',
    name: 'Sequence Master',
    description: 'Complete 10 sequences in a row',
    requirement: 10,
    unlocked: false
  },
  {
    id: 'sequence_master_20',
    name: 'Sequence Expert',
    description: 'Complete 20 sequences in a row',
    requirement: 20,
    unlocked: false
  },
  {
    id: 'level_complete_3',
    name: 'Easy Champion',
    description: 'Reach sequence length 15 on Easy mode',
    requirement: 15,
    unlocked: false
  },
  {
    id: 'level_complete_6',
    name: 'Medium Champion',
    description: 'Reach sequence length 15 on Medium mode',
    requirement: 15,
    unlocked: false
  },
  {
    id: 'level_complete_8',
    name: 'Hard Champion',
    description: 'Reach sequence length 15 on Hard mode',
    requirement: 15,
    unlocked: false
  },
  {
    id: 'level_complete_12',
    name: 'Expert Champion',
    description: 'Reach sequence length 15 on Expert mode',
    requirement: 15,
    unlocked: false
  }
];

export const PIANO_NOTES = [
  'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'
];

export const LEVEL_CONFIG = {
  3: { name: 'Easy', color: 'bg-green-500' },
  6: { name: 'Medium', color: 'bg-yellow-500' },
  8: { name: 'Hard', color: 'bg-orange-500' },
  12: { name: 'Expert', color: 'bg-red-500' }
};

export const STORAGE_KEY = 'musicalMemoryGame_data';

export const INITIAL_GAME_STATE = {
  currentLevel: 3 as const,
  currentSequence: [],
  userSequence: [],
  score: 0,
  highScore: 0,
  lives: 3,
  isPlayingSequence: false,
  gamePhase: 'idle' as const
};