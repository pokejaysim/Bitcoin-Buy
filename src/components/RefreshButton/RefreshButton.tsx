import React from 'react';
import { RefreshButtonProps } from '../../types';

const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefresh, isLoading, lastUpdated }) => {
  const formatLastUpdated = (timestamp?: number) => {
    if (!timestamp) return 'Never updated';
    
    const now = Date.now();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes === 0) return 'Just updated';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className={`
          group relative px-8 py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform overflow-hidden
          ${isLoading 
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white hover:scale-105 active:scale-95 shadow-2xl hover:shadow-orange-500/25'
          }
        `}
      >
        {/* Background animation */}
        {!isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}
        
        <div className="relative flex items-center space-x-3">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
              <span>Analyzing Market...</span>
            </>
          ) : (
            <>
              <div className="text-2xl group-hover:animate-spin">🔄</div>
              <span>Get Latest Analysis</span>
            </>
          )}
        </div>
        
        {/* Loading progress bar */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 h-1 bg-orange-500/30 rounded-full w-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Shimmer effect */}
        {!isLoading && (
          <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
        )}
      </button>

      {/* Last updated info */}
      {lastUpdated && (
        <div className="text-center bg-white/5 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
          <div className="text-sm text-gray-400">Last updated:</div>
          <div className="text-sm font-medium text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            {formatLastUpdated(lastUpdated)}
          </div>
        </div>
      )}
    </div>
  );
};

export default RefreshButton;