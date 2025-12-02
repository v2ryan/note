import { StoredGameData, Achievement, GameLevel } from '../types/game';
import { ACHIEVEMENTS, STORAGE_KEY } from '../constants/game';

export class StorageService {
  private storage: Storage;
  
  constructor() {
    this.storage = window.localStorage;
  }
  
  loadGameData(): StoredGameData | null {
    try {
      const data = this.storage.getItem(STORAGE_KEY);
      if (!data) return null;
      
      const parsed = JSON.parse(data);
      return {
        ...parsed,
        achievements: parsed.achievements || ACHIEVEMENTS
      };
    } catch (error) {
      console.error('Failed to load game data:', error);
      return null;
    }
  }
  
  saveGameData(data: StoredGameData): void {
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save game data:', error);
    }
  }
  
  updateHighScore(score: number): void {
    const data = this.loadGameData();
    if (data) {
      data.highScore = Math.max(data.highScore, score);
      this.saveGameData(data);
    } else {
      this.saveGameData({
        highScore: score,
        totalGamesPlayed: 0,
        achievements: ACHIEVEMENTS,
        unlockedAudioSnippets: [],
        lastPlayedLevel: 3
      });
    }
  }
  
  incrementGamesPlayed(): void {
    const data = this.loadGameData();
    if (data) {
      data.totalGamesPlayed++;
      this.saveGameData(data);
    } else {
      this.saveGameData({
        highScore: 0,
        totalGamesPlayed: 1,
        achievements: ACHIEVEMENTS,
        unlockedAudioSnippets: [],
        lastPlayedLevel: 3
      });
    }
  }
  
  updateLastPlayedLevel(level: GameLevel): void {
    const data = this.loadGameData();
    if (data) {
      data.lastPlayedLevel = level;
      this.saveGameData(data);
    }
  }
  
  unlockAchievement(achievementId: string): void {
    const data = this.loadGameData();
    if (data) {
      const achievement = data.achievements.find(a => a.id === achievementId);
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.unlockedDate = new Date();
        this.saveGameData(data);
      }
    }
  }
  
  getAchievements(): Achievement[] {
    const data = this.loadGameData();
    return data?.achievements || ACHIEVEMENTS;
  }
  
  getHighScore(): number {
    const data = this.loadGameData();
    return data?.highScore || 0;
  }
  
  getTotalGamesPlayed(): number {
    const data = this.loadGameData();
    return data?.totalGamesPlayed || 0;
  }
  
  getLastPlayedLevel(): GameLevel {
    const data = this.loadGameData();
    return data?.lastPlayedLevel || 3;
  }
}

export const storageService = new StorageService();