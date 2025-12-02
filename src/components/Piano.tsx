import React from 'react';
import { PianoProps } from '../types/game';

const Piano: React.FC<PianoProps> = ({ onKeyPress, highlightedKeys, disabled }) => {
  const notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];
  
  const isSharpNote = (note: string) => note.includes('#');
  const isHighlighted = (note: string) => highlightedKeys.includes(note);
  
  const handleKeyPress = (note: string) => {
    if (!disabled) {
      onKeyPress(note);
    }
  };
  
  const getKeyClassName = (note: string) => {
    const isSharp = isSharpNote(note);
    const isHighlightedKey = isHighlighted(note);
    
    let baseClass = 'transition-all duration-200 transform hover:scale-105 active:scale-95 ';
    
    if (isSharp) {
      baseClass += 'bg-gray-800 text-white h-32 w-8 rounded-b-lg shadow-lg hover:bg-gray-700 ';
      if (isHighlightedKey) {
        baseClass += 'bg-purple-600 hover:bg-purple-500 ';
      }
      if (disabled) {
        baseClass += 'opacity-50 cursor-not-allowed ';
      } else {
        baseClass += 'cursor-pointer ';
      }
    } else {
      baseClass += 'bg-white text-gray-800 h-40 w-12 rounded-b-lg shadow-lg hover:bg-gray-100 border-2 border-gray-200 ';
      if (isHighlightedKey) {
        baseClass += 'bg-purple-100 border-purple-400 ';
      }
      if (disabled) {
        baseClass += 'opacity-50 cursor-not-allowed ';
      } else {
        baseClass += 'cursor-pointer ';
      }
    }
    
    return baseClass;
  };
  
  const getSharpKeyPosition = (index: number) => {
    const positions = {
      1: 'left-6', // C#
      3: 'left-20', // D#
      6: 'left-48', // F#
      8: 'left-62', // G#
      10: 'left-76' // A#
    };
    return positions[index as keyof typeof positions] || '';
  };
  
  return (
    <div className="relative flex justify-center items-end bg-gray-100 p-8 rounded-lg shadow-inner">
      <div className="relative flex">
        {/* White keys */}
        {notes.map((note) => {
          if (isSharpNote(note)) return null;
          
          return (
            <button
              key={note}
              className={getKeyClassName(note)}
              onClick={() => handleKeyPress(note)}
              disabled={disabled}
              aria-label={`Play ${note}`}
            >
              <div className="mt-auto pb-2 text-sm font-medium">
                {note.replace('4', '')}
              </div>
            </button>
          );
        })}
        
        {/* Black keys */}
        {notes.map((note, index) => {
          if (!isSharpNote(note)) return null;
          
          return (
            <button
              key={note}
              className={`absolute ${getSharpKeyPosition(index)} ${getKeyClassName(note)}`}
              onClick={() => handleKeyPress(note)}
              disabled={disabled}
              aria-label={`Play ${note}`}
            >
              <div className="mt-auto pb-2 text-xs font-medium">
                {note.replace('4', '')}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Piano;