import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Music, Trophy, Heart, Play, RotateCcw, Info } from 'lucide-react';
import Piano from '../components/Piano';
import { useGameStore } from '../store/gameStore';
import { LEVEL_CONFIG } from '../constants/game';

const Game: React.FC = () => {
  const {
    currentLevel,
    currentSequence,
    score,
    highScore,
    lives,
    gamePhase,
    isPlayingSequence,
    setLevel,
    startNewGame,
    playSequence,
    handleKeyPress,
    resetGame
  } = useGameStore();
  
  useEffect(() => {
    // Initialize with last played level
    const lastLevel = localStorage.getItem('lastPlayedLevel');
    if (lastLevel && ['3', '6', '8', '12'].includes(lastLevel)) {
      setLevel(Number(lastLevel) as 3 | 6 | 8 | 12);
    }
  }, [setLevel]);
  
  const handleStartGame = async () => {
    startNewGame();
    // Small delay to ensure state is updated before playing sequence
    setTimeout(() => {
      playSequence();
    }, 100);
  };
  
  const handleLevelChange = (level: 3 | 6 | 8 | 12) => {
    if (gamePhase === 'idle' || gamePhase === 'gameOver') {
      setLevel(level);
    }
  };
  
  const getPhaseMessage = () => {
    switch (gamePhase) {
      case 'idle':
        return 'Select a level and click Start to begin!';
      case 'playing':
        return 'Listen to the sequence...';
      case 'input':
        return 'Now repeat the sequence!';
      case 'success':
        return 'Great! Get ready for the next sequence...';
      case 'failure':
        return 'Oops! Try again...';
      case 'gameOver':
        return `Game Over! Final score: ${score}`;
      default:
        return '';
    }
  };
  
  const getPhaseColor = () => {
    switch (gamePhase) {
      case 'success':
        return 'text-green-600';
      case 'failure':
        return 'text-red-600';
      case 'gameOver':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
            <Music className="w-8 h-8" />
            Musical Memory Game
          </h1>
          <p className="text-gray-600">Test your musical memory by repeating sequences!</p>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/instructions"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <Info className="w-4 h-4" />
            How to Play
          </Link>
          <Link
            to="/achievements"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <Trophy className="w-4 h-4" />
            Achievements
          </Link>
        </div>
        
        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">Score</div>
            <div className="text-2xl font-bold text-purple-600">{score}</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">High Score</div>
            <div className="text-2xl font-bold text-green-600">{highScore}</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">Lives</div>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 ${
                    i < lives ? 'text-red-500 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">Sequence Length</div>
            <div className="text-2xl font-bold text-blue-600">{currentSequence.length}</div>
          </div>
        </div>
        
        {/* Level Selection */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Difficulty Level</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.keys(LEVEL_CONFIG) as unknown as [3, 6, 8, 12]).map((level) => (
              <button
                key={level}
                onClick={() => handleLevelChange(level)}
                disabled={gamePhase !== 'idle' && gamePhase !== 'gameOver'}
                className={`p-3 rounded-lg font-medium transition-all ${
                  currentLevel === level
                    ? `${LEVEL_CONFIG[level].color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${
                  (gamePhase !== 'idle' && gamePhase !== 'gameOver') 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer'
                }`}
              >
                {LEVEL_CONFIG[level].name}
                <div className="text-xs opacity-75">{level} notes</div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Game Status */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <div className="text-center">
            <div className={`text-lg font-medium mb-4 ${getPhaseColor()}`}>
              {getPhaseMessage()}
            </div>
            
            {/* Control Buttons */}
            <div className="flex justify-center gap-4">
              {(gamePhase === 'idle' || gamePhase === 'gameOver') && (
                <button
                  onClick={handleStartGame}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <Play className="w-4 h-4" />
                  Start Game
                </button>
              )}
              
              {gamePhase !== 'idle' && (
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Piano Keyboard */}
        <div className="bg-white rounded-lg p-6 shadow">
          <Piano
            onKeyPress={handleKeyPress}
            highlightedKeys={gamePhase === 'playing' ? currentSequence : []}
            disabled={gamePhase !== 'input' || isPlayingSequence}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;