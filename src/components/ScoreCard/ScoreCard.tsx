import React from 'react';
import { ScoreCardProps } from '../../types';

const ScoreCard: React.FC<ScoreCardProps> = ({ buySignal, isLoading = false }) => {
  const getScoreColor = (score: number) => {
    if (score >= 6) return 'text-success';
    if (score >= 4) return 'text-warning';
    return 'text-danger';
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-danger';
      default: return 'text-gray-400';
    }
  };

  const getBackgroundGradient = (shouldBuy: boolean) => {
    return shouldBuy 
      ? 'bg-gradient-to-br from-green-500/20 to-bitcoin-orange/20'
      : 'bg-gradient-to-br from-red-500/20 to-gray-600/20';
  };

  if (isLoading) {
    return (
      <div className="glassmorphism rounded-xl p-8 h-full">
        <div className="animate-pulse text-center">
          <div className="h-6 bg-gray-600 rounded w-24 mx-auto mb-4"></div>
          <div className="h-20 w-20 bg-gray-600 rounded-full mx-auto mb-6"></div>
          <div className="h-8 bg-gray-600 rounded w-32 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-600 rounded w-28 mx-auto mb-6"></div>
          <div className="h-12 bg-gray-600 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!buySignal) {
    return (
      <div className="glassmorphism rounded-xl p-8 h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-4">📊</div>
          <p>Loading analysis...</p>
        </div>
      </div>
    );
  }

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (buySignal.confidencePercentage / 100) * circumference;

  return (
    <div className={`glassmorphism rounded-xl p-8 h-full relative overflow-hidden ${getBackgroundGradient(buySignal.shouldBuy)}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        {buySignal.shouldBuy ? (
          <div className="text-9xl text-success absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            ✓
          </div>
        ) : (
          <div className="text-9xl text-danger absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            ✗
          </div>
        )}
      </div>

      <div className="text-center relative z-10">
        <div className="text-gray-400 text-sm uppercase tracking-wide mb-6 font-medium">
          Buy Signal Analysis
        </div>

        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-600"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-1000 ease-out ${getScoreColor(buySignal.score)}`}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Score in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(buySignal.score)}`}>
                {buySignal.score}
              </div>
              <div className="text-xs text-gray-400">/ {buySignal.maxScore}</div>
            </div>
          </div>
        </div>

        {/* Buy/Don't Buy Decision */}
        <div className="mb-6">
          <div className={`text-3xl font-bold mb-2 ${buySignal.shouldBuy ? 'text-success' : 'text-danger'}`}>
            {buySignal.shouldBuy ? '🚀 BUY' : '⏳ WAIT'}
          </div>
          <div className={`text-lg ${getConfidenceColor(buySignal.confidence)}`}>
            {buySignal.confidence} Confidence
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${
              buySignal.confidence === 'High' ? 'bg-success' :
              buySignal.confidence === 'Medium' ? 'bg-warning' : 'bg-danger'
            }`}
            style={{ width: `${buySignal.confidencePercentage}%` }}
          />
        </div>

        <div className="text-sm text-gray-400">
          {buySignal.confidencePercentage}% Confidence Score
        </div>

        {buySignal.shouldBuy && (
          <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="text-success text-sm font-medium">
              ✅ Multiple indicators suggest this may be a good buying opportunity
            </div>
          </div>
        )}

        {!buySignal.shouldBuy && (
          <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="text-warning text-sm font-medium">
              ⚠️ Indicators suggest waiting for better conditions
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;