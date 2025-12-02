import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music, Headphones, MousePointer, Trophy, Target, Sparkles } from 'lucide-react';
import { LEVEL_CONFIG } from '../constants/game';

const Instructions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Link>
          <h1 className="text-3xl font-bold text-purple-800">How to Play</h1>
        </div>
        
        {/* Game Overview */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Music className="w-6 h-6 text-purple-600" />
            Game Overview
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Musical Memory Game challenges your ability to remember and repeat musical sequences. 
            Listen to a sequence of piano notes, then reproduce it by clicking the correct keys 
            on the virtual piano. As you succeed, the sequences become longer and more challenging!
          </p>
        </div>
        
        {/* How to Play Steps */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-green-600" />
            Step-by-Step Guide
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Choose Your Difficulty</h3>
                <p className="text-gray-600">
                  Select from four difficulty levels: Easy (3 notes), Medium (6 notes), 
                  Hard (8 notes), or Expert (12 notes). Each level uses a different range 
                  of the piano keyboard.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Headphones className="w-4 h-4" />
                  Listen Carefully
                </h3>
                <p className="text-gray-600">
                  Click "Start Game" and listen to the sequence of notes played. 
                  Watch as the piano keys light up to show you which notes are being played.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <MousePointer className="w-4 h-4" />
                  Repeat the Sequence
                </h3>
                <p className="text-gray-600">
                  After the sequence finishes, click the piano keys in the same order 
                  to reproduce what you heard. Each key will play its note when clicked.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Keep Going!</h3>
                <p className="text-gray-600">
                  If you get it right, the next sequence will be one note longer. 
                  If you make a mistake, you'll lose a life and get to try the same sequence again.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Difficulty Levels */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Difficulty Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(LEVEL_CONFIG) as unknown as [3, 6, 8, 12]).map((level) => (
              <div key={level} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${LEVEL_CONFIG[level].color}`}></div>
                  <h3 className="font-semibold text-gray-800">{LEVEL_CONFIG[level].name}</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Uses {level} notes from the piano keyboard. 
                  {level === 3 && ' Perfect for beginners learning the basics.'}
                  {level === 6 && ' A moderate challenge with more note options.'}
                  {level === 8 && ' Advanced players will enjoy this complexity.'}
                  {level === 12 && ' The ultimate test of musical memory!'}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scoring System */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-600" />
            Scoring & Achievements
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Scoring</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Each correctly completed sequence earns you 1 point</li>
                <li>• Your score increases with each successful sequence</li>
                <li>• High scores are saved and displayed on the main screen</li>
                <li>• Game ends when you lose all 3 lives</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Achievements
              </h3>
              <p className="text-gray-600">
                Earn achievements by reaching milestones like completing your first sequence, 
                mastering 10 or 20 sequences, or reaching sequence length 15 on each difficulty level. 
                Check the Achievements page to see your progress and unlock rewards!
              </p>
            </div>
          </div>
        </div>
        
        {/* Tips */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pro Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Memory Techniques</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Create mental associations with each note</li>
                <li>• Practice with shorter sequences first</li>
                <li>• Focus on the pattern rather than individual notes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Practice Strategy</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Start with Easy level to learn the notes</li>
                <li>• Gradually work your way up to harder levels</li>
                <li>• Take breaks to avoid mental fatigue</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;