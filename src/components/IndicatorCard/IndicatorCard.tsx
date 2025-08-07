import React from 'react';
import { IndicatorCardProps } from '../../types';

const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicator, isLoading = false }) => {
  const getStatusStyle = (status: string, points: number) => {
    if (points > 0) {
      return {
        border: 'border-green-500/40',
        bg: 'bg-green-500/5',
        icon: '🟢',
        textColor: 'text-green-400',
        progressBg: 'bg-green-500'
      };
    } else if (status === 'negative') {
      return {
        border: 'border-red-500/40',
        bg: 'bg-red-500/5',
        icon: '🔴',
        textColor: 'text-red-400',
        progressBg: 'bg-red-500'
      };
    } else {
      return {
        border: 'border-gray-600/40',
        bg: 'bg-gray-600/5',
        icon: '⚪',
        textColor: 'text-gray-400',
        progressBg: 'bg-gray-500'
      };
    }
  };

  const getIndicatorIcon = (name: string) => {
    const iconMap: { [key: string]: string } = {
      'RSI (14)': '📈',
      'MACD': '📊',
      'Volatility': '🌊',
      'Support Level': '🛡️',
      'Fear & Greed': '😰',
      'Volume Spike': '📢',
      'Sentiment': '💭',
      'Macro Factors': '🌍'
    };
    return iconMap[name] || '📋';
  };

  const getSimpleExplanation = (name: string, points: number, value: any) => {
    const explanations: { [key: string]: (p: number, v: any) => string } = {
      'RSI (14)': (p, v) => p > 0 ? 'Bitcoin is oversold - good for buying!' : 'Bitcoin is not oversold yet',
      'MACD': (p, v) => p > 0 ? 'Price momentum is turning bullish' : 'No bullish momentum signal yet',
      'Volatility': (p, v) => p > 0 ? 'Low volatility - stable conditions' : 'High volatility - risky conditions',
      'Support Level': (p, v) => p > 0 ? 'Price is near support - good entry' : 'Price is above support levels',
      'Fear & Greed': (p, v) => p > 0 ? 'Market is fearful - opportunity!' : 'Market is not fearful enough',
      'Volume Spike': (p, v) => p > 0 ? 'High trading activity detected' : 'Normal trading volume',
      'Sentiment': (p, v) => p > 0 ? 'General market sentiment is positive' : 'Market sentiment is neutral/negative',
      'Macro Factors': (p, v) => p > 0 ? 'Economic conditions favor Bitcoin' : 'Economic conditions are neutral'
    };
    return explanations[name] ? explanations[name](points, value) : 'Analysis complete';
  };

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-lg">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-600 rounded w-24 mb-3"></div>
          <div className="h-8 bg-gray-600 rounded w-32 mb-4"></div>
          <div className="h-2 bg-gray-600 rounded w-full mb-3"></div>
          <div className="h-12 bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  const style = getStatusStyle(indicator.status, indicator.points);
  const progressPercentage = (indicator.points / indicator.maxPoints) * 100;

  return (
    <div className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border ${style.border} ${style.bg} shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden group`}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getIndicatorIcon(indicator.name)}</span>
            <div>
              <h3 className="font-bold text-white text-lg">{indicator.name}</h3>
              <div className="text-sm text-gray-400">
                {indicator.points > 0 ? `+${indicator.points} points` : '0 points'}
              </div>
            </div>
          </div>
          <div className="text-3xl">{style.icon}</div>
        </div>

        {/* Value */}
        <div className="mb-4">
          <div className="text-3xl font-black text-white mb-1">
            {indicator.value}
          </div>
          {indicator.signal && (
            <div className="text-sm text-gray-400 capitalize bg-gray-800/50 px-2 py-1 rounded-lg inline-block">
              {indicator.signal}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Contribution</span>
            <span>{indicator.points}/{indicator.maxPoints} pts</span>
          </div>
          <div className="bg-gray-700/50 rounded-full h-3 overflow-hidden backdrop-blur">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${style.progressBg} rounded-full relative`}
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage > 0 && (
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        </div>

        {/* Simple Explanation */}
        <div className="bg-gray-800/30 backdrop-blur rounded-xl p-3">
          <p className="text-sm text-gray-300 leading-relaxed">
            {getSimpleExplanation(indicator.name, indicator.points, indicator.value)}
          </p>
        </div>
      </div>

      {/* Success pulse effect */}
      {indicator.points > 0 && (
        <div className="absolute inset-0 rounded-2xl border-2 border-green-400/30 animate-pulse pointer-events-none"></div>
      )}
    </div>
  );
};

export default IndicatorCard;