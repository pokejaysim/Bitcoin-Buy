import React from 'react';
import { RefreshButtonProps } from '../../types';

const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefresh, isLoading, lastUpdated }) => {
  const formatLastUpdated = (timestamp?: number) => {
    if (!timestamp) return 'Never';
    
    const now = Date.now();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes === 0) return 'Just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className={`
          relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 
          ${isLoading 
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
            : 'bg-bitcoin-orange hover:bg-orange-600 text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
          }
        `}
      >
        <div className="flex items-center space-x-3">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <div className="text-2xl">🔄</div>
              <span>Refresh & Calculate</span>
            </>
          )}
        </div>
        
        {/* Loading progress bar */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 h-1 bg-bitcoin-orange/30 rounded-full w-full overflow-hidden">
            <div className="h-full bg-bitcoin-orange rounded-full animate-pulse"></div>
          </div>
        )}
      </button>

      {/* Last updated info */}
      <div className="text-center sm:text-left">
        <div className="text-sm text-gray-400">Last updated</div>
        <div className="text-sm font-medium text-white">
          {formatLastUpdated(lastUpdated)}
        </div>
      </div>
    </div>
  );
};

export default RefreshButton;