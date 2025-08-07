import React from 'react';
import { IndicatorCardProps } from '../../types';

const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicator, isLoading = false }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive': return 'text-success border-success/30 bg-success/10';
      case 'negative': return 'text-danger border-danger/30 bg-danger/10';
      case 'neutral': return 'text-gray-400 border-gray-600/30 bg-gray-600/10';
      default: return 'text-gray-400 border-gray-600/30 bg-gray-600/10';
    }
  };

  const getStatusIcon = (status: string, points: number) => {
    if (points > 0) return '✅';
    if (status === 'negative') return '❌';
    return '⚪';
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'positive': return 'bg-success';
      case 'negative': return 'bg-danger';
      case 'neutral': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="glassmorphism rounded-xl p-6 border border-gray-600/30">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-600 rounded w-24 mb-3"></div>
          <div className="h-8 bg-gray-600 rounded w-32 mb-4"></div>
          <div className="h-2 bg-gray-600 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-600 rounded w-20"></div>
        </div>
      </div>
    );
  }

  const progressPercentage = (indicator.points / indicator.maxPoints) * 100;

  return (
    <div className={`glassmorphism rounded-xl p-6 border transition-all duration-300 hover:scale-105 ${getStatusColor(indicator.status)}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white text-lg">{indicator.name}</h3>
        </div>
        <div className="text-2xl">
          {getStatusIcon(indicator.status, indicator.points)}
        </div>
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className="text-2xl font-bold text-white font-mono">
          {indicator.value}
        </div>
        {indicator.signal && (
          <div className="text-sm text-gray-400 capitalize">
            {indicator.signal}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Points</span>
          <span>{indicator.points}/{indicator.maxPoints}</span>
        </div>
        <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${getProgressColor(indicator.status)}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed">
        {indicator.description}
      </p>

      {/* Pulse effect for positive indicators */}
      {indicator.points > 0 && (
        <div className="absolute inset-0 rounded-xl border-2 border-success/50 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

export default IndicatorCard;