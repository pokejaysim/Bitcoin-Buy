import React from 'react';
import { PriceHeaderProps } from '../../types';

const PriceHeader: React.FC<PriceHeaderProps> = ({ bitcoinData, isLoading = false }) => {
  const formatCurrency = (value: number | undefined) => {
    if (!value) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatVolume = (value: number | undefined) => {
    if (!value) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const formatPercentage = (value: number | undefined) => {
    if (!value) return '0.00%';
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const getChangeColor = (change: number | undefined) => {
    if (!change) return 'text-gray-400';
    return change >= 0 ? 'text-success' : 'text-danger';
  };

  if (isLoading) {
    return (
      <div className="glassmorphism rounded-xl p-6">
        <div className="animate-pulse">
          <div className="text-center">
            <div className="h-8 bg-gray-600 rounded w-32 mx-auto mb-2"></div>
            <div className="h-12 bg-gray-600 rounded w-48 mx-auto mb-4"></div>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="h-4 bg-gray-600 rounded w-16 mb-1"></div>
                <div className="h-6 bg-gray-600 rounded w-20"></div>
              </div>
              <div className="text-center">
                <div className="h-4 bg-gray-600 rounded w-20 mb-1"></div>
                <div className="h-6 bg-gray-600 rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glassmorphism rounded-xl p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-bitcoin-orange opacity-5 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-bitcoin-blue opacity-5 rounded-full -ml-12 -mb-12"></div>
      
      <div className="text-center relative z-10">
        <div className="text-gray-400 text-sm uppercase tracking-wide mb-2 font-medium">
          Bitcoin Price
        </div>
        
        <div className="text-4xl md:text-5xl font-bold text-white mb-4 animate-counter font-mono">
          {formatCurrency(bitcoinData?.price)}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <div className="text-center">
            <div className="text-gray-400 text-sm uppercase tracking-wide">24h Change</div>
            <div className={`text-xl font-semibold ${getChangeColor(bitcoinData?.change24h)}`}>
              {formatPercentage(bitcoinData?.change24h)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-gray-400 text-sm uppercase tracking-wide">24h Volume</div>
            <div className="text-xl font-semibold text-gray-300">
              {formatVolume(bitcoinData?.volume24h)}
            </div>
          </div>
        </div>

        {bitcoinData && (
          <div className="mt-4 text-xs text-gray-500">
            Last updated: {new Date(bitcoinData.timestamp).toLocaleString()}
          </div>
        )}
      </div>

      {/* Live indicator */}
      {bitcoinData && (
        <div className="absolute top-4 left-4 flex items-center">
          <div className="relative">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <div className="pulse-ring w-2 h-2 bg-success"></div>
          </div>
          <span className="text-xs text-success ml-2 font-medium">LIVE</span>
        </div>
      )}
    </div>
  );
};

export default PriceHeader;