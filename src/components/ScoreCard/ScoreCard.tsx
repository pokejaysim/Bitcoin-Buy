import React from 'react';
import { ScoreCardProps } from '../../types';

const ScoreCard: React.FC<ScoreCardProps> = ({ buySignal, isLoading = false }) => {
  const getDecisionStyle = (shouldBuy: boolean, confidence: string) => {
    if (shouldBuy) {
      return {
        bg: 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/30',
        text: 'text-green-400',
        icon: '🚀',
        action: 'BUY BITCOIN',
        emoji: '✨'
      };
    } else {
      return {
        bg: 'bg-gradient-to-br from-red-500/20 to-orange-600/20 border-red-500/30',
        text: 'text-red-400',
        icon: '⏸️',
        action: 'WAIT',
        emoji: '⏳'
      };
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-600 rounded-2xl w-48 mx-auto mb-6"></div>
          <div className="h-32 w-32 bg-gray-600 rounded-full mx-auto mb-8"></div>
          <div className="h-12 bg-gray-600 rounded-2xl w-40 mx-auto mb-6"></div>
          <div className="h-6 bg-gray-600 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!buySignal) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-6xl mb-4">🔄</div>
          <p className="text-xl">Analyzing market conditions...</p>
        </div>
      </div>
    );
  }

  const style = getDecisionStyle(buySignal.shouldBuy, buySignal.confidence);
  const circumference = 2 * Math.PI * 60; // larger radius for more prominence
  const strokeDashoffset = circumference - (buySignal.score / buySignal.maxScore) * circumference;

  return (
    <div className={`bg-white/5 backdrop-blur-xl rounded-3xl p-12 border ${style.bg} shadow-2xl relative overflow-hidden`}>
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
      
      <div className="text-center relative z-10">
        {/* Main Decision */}
        <div className="mb-8">
          <div className="text-6xl mb-4">{style.icon}</div>
          <h2 className={`text-4xl md:text-6xl font-black ${style.text} mb-4`}>
            {style.action}
          </h2>
          <div className="flex items-center justify-center gap-3 text-xl">
            <span className="text-gray-300">Confidence:</span>
            <span className={`font-bold ${getConfidenceColor(buySignal.confidence)}`}>
              {buySignal.confidence}
            </span>
            <span className="text-gray-400">
              ({buySignal.confidencePercentage}%)
            </span>
          </div>
        </div>

        {/* Score Visualization */}
        <div className="mb-8">
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 140 140">
              {/* Background circle */}
              <circle
                cx="70"
                cy="70"
                r="60"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-gray-700"
              />
              {/* Progress circle */}
              <circle
                cx="70"
                cy="70"
                r="60"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={`transition-all duration-2000 ease-out ${style.text}`}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Score in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-5xl font-black ${style.text}`}>
                  {buySignal.score}
                </div>
                <div className="text-gray-400 text-lg">/ {buySignal.maxScore}</div>
                <div className="text-gray-500 text-sm">points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="space-y-4">
          {buySignal.shouldBuy ? (
            <div className="bg-green-500/10 backdrop-blur border border-green-500/20 rounded-2xl p-6">
              <div className="text-green-400 text-2xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Strong Buy Signal</h3>
              <p className="text-gray-300">
                Multiple technical indicators are aligned in your favor. This could be a good time to consider buying Bitcoin, but remember to always do your own research.
              </p>
            </div>
          ) : (
            <div className="bg-yellow-500/10 backdrop-blur border border-yellow-500/20 rounded-2xl p-6">
              <div className="text-yellow-400 text-2xl mb-3">⚠️</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Hold Off for Now</h3>
              <p className="text-gray-300">
                Current market conditions suggest it might be better to wait. Consider monitoring the indicators and waiting for a better entry point.
              </p>
            </div>
          )}
        </div>

        {/* Score breakdown preview */}
        <div className="mt-8 text-sm text-gray-400">
          <p>Based on 8 technical indicators • Updated in real-time</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;