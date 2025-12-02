import { create } from 'zustand';
import { GameState, GameLevel, Achievement } from '../types/game';
import { INITIAL_GAME_STATE } from '../constants/game';
import { audioService } from '../services/AudioService';
import { GameEngine } from '../services/GameEngine';
import { storageService } from '../services/StorageService';

interface GameStore extends GameState {
  // Actions
  setLevel: (level: GameLevel) => void;
  startNewGame: () => void;
  playSequence: () => Promise<void>;
  handleKeyPress: (note: string) => void;
  resetGame: () => void;
  // Achievement management
  achievements: Achievement[];
  loadAchievements: () => void;
  checkAchievements: () => void;
}

const gameEngine = new GameEngine();

export const useGameStore = create<GameStore>((set, get) => ({
  ...INITIAL_GAME_STATE,
  highScore: storageService.getHighScore(),
  achievements: storageService.getAchievements(),
  
  setLevel: (level) => {
    set({ currentLevel: level });
    storageService.updateLastPlayedLevel(level);
  },
  
  startNewGame: () => {
    const { currentLevel } = get();
    const initialSequence = gameEngine.generateInitialSequence(currentLevel);
    
    set({
      currentSequence: initialSequence,
      userSequence: [],
      score: 0,
      lives: 3,
      gamePhase: 'idle',
      isPlayingSequence: false
    });
    
    storageService.incrementGamesPlayed();
  },
  
  playSequence: async () => {
    const { currentSequence } = get();
    
    set({
      isPlayingSequence: true,
      gamePhase: 'playing',
      userSequence: []
    });
    
    await audioService.playSequence(currentSequence);
    
    set({
      isPlayingSequence: false,
      gamePhase: 'input'
    });
  },
  
  handleKeyPress: (note) => {
    const { gamePhase, currentSequence, userSequence, score, lives, currentLevel } = get();
    
    if (gamePhase !== 'input' || get().isPlayingSequence) {
      return;
    }
    
    // Play the note
    audioService.playNote(note);
    
    const newUserSequence = [...userSequence, note];
    set({ userSequence: newUserSequence });
    
    // Check if the current input is correct
    const isPartiallyCorrect = gameEngine.checkPartialSequence(newUserSequence, currentSequence);
    
    if (!isPartiallyCorrect) {
      // Wrong note - lose a life
      const newLives = lives - 1;
      set({ 
        lives: newLives,
        gamePhase: 'failure'
      });
      
      if (newLives <= 0) {
        // Game over
        setTimeout(() => {
          set({ gamePhase: 'gameOver' });
          storageService.updateHighScore(score);
        }, 1000);
      } else {
        // Retry same sequence
        setTimeout(() => {
          set({ userSequence: [] });
          get().playSequence();
        }, 1000);
      }
    } else if (newUserSequence.length === currentSequence.length) {
      // Completed sequence successfully
      const newScore = score + 1;
      set({ 
        score: newScore,
        gamePhase: 'success'
      });
      
      // Check achievements
      setTimeout(() => {
        get().checkAchievements();
      }, 500);
      
      // Generate next sequence
      setTimeout(() => {
        const nextSequence = gameEngine.generateNextSequence(currentSequence.length, currentLevel);
        set({ 
          currentSequence: nextSequence,
          userSequence: []
        });
        get().playSequence();
      }, 1500);
    }
  },
  
  resetGame: () => {
    set({
      ...INITIAL_GAME_STATE,
      highScore: storageService.getHighScore(),
      achievements: storageService.getAchievements()
    });
  },
  
  loadAchievements: () => {
    set({ achievements: storageService.getAchievements() });
  },
  
  checkAchievements: () => {
    const { score, currentLevel, currentSequence } = get();
    
    // Check sequence-based achievements
    if (score >= 1) {
      storageService.unlockAchievement('first_sequence');
    }
    if (score >= 10) {
      storageService.unlockAchievement('sequence_master_10');
    }
    if (score >= 20) {
      storageService.unlockAchievement('sequence_master_20');
    }
    
    // Check level-based achievements
    if (currentLevel === 3 && currentSequence.length >= 15) {
      storageService.unlockAchievement('level_complete_3');
    }
    if (currentLevel === 6 && currentSequence.length >= 15) {
      storageService.unlockAchievement('level_complete_6');
    }
    if (currentLevel === 8 && currentSequence.length >= 15) {
      storageService.unlockAchievement('level_complete_8');
    }
    if (currentLevel === 12 && currentSequence.length >= 15) {
      storageService.unlockAchievement('level_complete_12');
    }
    
    // Reload achievements to update UI
    get().loadAchievements();
  }
}));