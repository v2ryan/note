export class AudioService {
  private audioContext: AudioContext | null = null;
  
  constructor() {
    this.initializeAudioContext();
  }
  
  private initializeAudioContext(): void {
    try {
      this.audioContext = new AudioContext();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }
  
  playNote(note: string, duration: number = 0.3): void {
    if (!this.audioContext) {
      console.warn('Audio context not available');
      return;
    }
    
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.frequency.value = this.getNoteFrequency(note);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }
  
  private getNoteFrequency(note: string): number {
    const noteFrequencies: Record<string, number> = {
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13,
      'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
      'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88
    };
    return noteFrequencies[note] || 440;
  }
  
  playSequence(notes: string[], delay: number = 400): Promise<void> {
    return new Promise((resolve) => {
      let index = 0;
      
      const playNext = () => {
        if (index < notes.length) {
          this.playNote(notes[index]);
          index++;
          setTimeout(playNext, delay);
        } else {
          resolve();
        }
      };
      
      playNext();
    });
  }
}

export const audioService = new AudioService();