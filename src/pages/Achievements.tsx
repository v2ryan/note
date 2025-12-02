import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Star, Award, Target, TrendingUp } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { storageService } from '../services/StorageService';

const Achievements: React.FC = () => {
  const { achievements, loadAchievements } = useGameStore();
  
  const totalGamesPlayed = storageService.getTotalGamesPlayed();
  const highScore = storageService.getHighScore();
  
  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);
  
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;
  const completionPercentage = (unlockedAchievements / totalAchievements) * 100;
  
  const getAchievementIcon = (achievementId: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'first_sequence': <Star className="w-6 h-6" />,
      'sequence_master_10': <Trophy className="w-6 h-6" />,
      'sequence_master_20': <Award className="w-6 h-6" />,
      'level_complete_3': <Target className="w-6 h-6" />,
      'level_complete_6': <Target className="w-6 h-6" />,
      'level_complete_8': <Target className="w-6 h-6" />,
      'level_complete_12': <Target className="w-6 h-6" />
    };
    return iconMap[achievementId] || <Trophy className="w-6 h-6" />;
  };
  
  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Link>
          <h1 className="text-3xl font-bold text-purple-800 flex items-center gap-2">
            <Trophy className="w-8 h-8" />
            Achievements
          </h1>
        </div>
        
        {/* Progress Overview */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {unlockedAchievements}/{totalAchievements}
              </div>
              <div className="text-sm text-gray-600">Achievements Unlocked</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{highScore}</div>
              <div className="text-sm text-gray-600">High Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{totalGamesPlayed}</div>
              <div className="text-sm text-gray-600">Games Played</div>
            </div>
          </div>
        </div>
        
        {/* Achievement Gallery */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Achievement Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`border rounded-lg p-4 transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-md'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-full ${
                    achievement.unlocked
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {getAchievementIcon(achievement.id)}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded ${
                    achievement.unlocked
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {achievement.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                  {achievement.unlocked && achievement.unlockedDate && (
                    <span className="text-xs text-gray-500">
                      {formatDate(achievement.unlockedDate)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Statistics */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Game Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Performance</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">High Score:</span>
                  <span className="font-medium text-purple-600">{highScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Games Played:</span>
                  <span className="font-medium text-blue-600">{totalGamesPlayed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Achievement Progress:</span>
                  <span className="font-medium text-green-600">
                    {unlockedAchievements}/{totalAchievements}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Milestones</h3>
              <div className="space-y-2">
                {achievements.filter(a => a.unlocked).length > 0 ? (
                  achievements.filter(a => a.unlocked).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-600">{achievement.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No achievements unlocked yet. Start playing to earn your first badge!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;