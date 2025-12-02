import { GameLevel } from '../types/game';
import { PIANO_NOTES } from '../constants/game';

export class SequenceGenerator {
  private notes: string[] = PIANO_NOTES;
  
  generateSequence(length: number, level: GameLevel): string[] {
    const sequence: string[] = [];
    const availableNotes = this.notes.slice(0, level);
    
    for (let i = 0; i < length; i++) {
      const randomNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
      sequence.push(randomNote);
    }
    
    return sequence;
  }
}

export class GameEngine {
  private sequenceGenerator: SequenceGenerator;
  
  constructor() {
    this.sequenceGenerator = new SequenceGenerator();
  }
  
  generateInitialSequence(level: GameLevel): string[] {
    return this.sequenceGenerator.generateSequence(level, level);
  }
  
  generateNextSequence(currentLength: number, level: GameLevel): string[] {
    return this.sequenceGenerator.generateSequence(currentLength + 1, level);
  }
  
  validateSequence(userSequence: string[], targetSequence: string[]): boolean {
    if (userSequence.length !== targetSequence.length) {
      return false;
    }
    
    return userSequence.every((note, index) => note === targetSequence[index]);
  }
  
  checkPartialSequence(userSequence: string[], targetSequence: string[]): boolean {
    if (userSequence.length > targetSequence.length) {
      return false;
    }
    
    return userSequence.every((note, index) => note === targetSequence[index]);
  }
}