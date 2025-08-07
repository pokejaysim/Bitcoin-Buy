import React from 'react';
import IndicatorCard from '../IndicatorCard/IndicatorCard';
import { MarketIndicators } from '../../types';

interface IndicatorGridProps {
  indicators: MarketIndicators | null;
  isLoading?: boolean;
}

const IndicatorGrid: React.FC<IndicatorGridProps> = ({ indicators, isLoading = false }) => {
  if (isLoading || !indicators) {
    // Show skeleton loading state
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Market Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <IndicatorCard 
              key={i}
              indicator={{
                name: 'Loading...',
                value: '...',
                status: 'neutral',
                points: 0,
                maxPoints: 1,
                description: 'Loading indicator data...'
              }}
              isLoading={true}
            />
          ))}
        </div>
      </div>
    );
  }

  const indicatorKeys = Object.keys(indicators) as (keyof MarketIndicators)[];
  const totalPoints = indicatorKeys.reduce((sum, key) => sum + indicators[key].points, 0);
  const maxTotalPoints = indicatorKeys.reduce((sum, key) => sum + indicators[key].maxPoints, 0);

  return (
    <div className="space-y-6">
      {/* Header with summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-white mb-2 sm:mb-0">Market Indicators</h2>
        <div className="glassmorphism px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-400">Total: </span>
          <span className="font-bold text-bitcoin-orange">
            {totalPoints}/{maxTotalPoints} points
          </span>
        </div>
      </div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indicatorKeys.map((key, index) => (
          <div 
            key={key}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <IndicatorCard 
              indicator={indicators[key]}
              isLoading={false}
            />
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="glassmorphism rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {indicatorKeys.filter(key => indicators[key].status === 'positive').length}
            </div>
            <div className="text-sm text-gray-400">Positive</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">
              {indicatorKeys.filter(key => indicators[key].status === 'neutral').length}
            </div>
            <div className="text-sm text-gray-400">Neutral</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-danger">
              {indicatorKeys.filter(key => indicators[key].status === 'negative').length}
            </div>
            <div className="text-sm text-gray-400">Negative</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-bitcoin-orange">
              {Math.round((totalPoints / maxTotalPoints) * 100)}%
            </div>
            <div className="text-sm text-gray-400">Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorGrid;