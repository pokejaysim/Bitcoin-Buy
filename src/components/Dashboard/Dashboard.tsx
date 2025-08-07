import React, { useEffect } from 'react';
import { useBitcoinData } from '../../hooks/useBitcoinData';
import PriceHeader from '../PriceHeader/PriceHeader';
import ScoreCard from '../ScoreCard/ScoreCard';
import IndicatorGrid from '../IndicatorGrid/IndicatorGrid';
import RefreshButton from '../RefreshButton/RefreshButton';
import ManualControls from '../ManualControls/ManualControls';

const Dashboard: React.FC = () => {
  const {
    bitcoinData,
    indicators,
    buySignal,
    error,
    isLoading,
    loadingState,
    fetchData,
    refreshData,
    setManualSetting,
    manualSettings
  } = useBitcoinData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
        <div className="glassmorphism rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Data</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={refreshData}
            className="bg-bitcoin-orange hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bitcoin-gradient mb-2">
            Bitcoin Buy Indicator
          </h1>
          <p className="text-gray-400">
            AI-powered analysis combining technical indicators and market sentiment
          </p>
        </div>

        {/* Price Header */}
        <div className="mb-6">
          <PriceHeader bitcoinData={bitcoinData} isLoading={loadingState.price} />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
          <RefreshButton 
            onRefresh={refreshData} 
            isLoading={isLoading}
            lastUpdated={buySignal?.lastUpdated}
          />
          <ManualControls 
            settings={manualSettings}
            onSettingChange={setManualSetting}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Score Card - Takes full width on mobile, 1 column on xl */}
          <div className="xl:col-span-1">
            <ScoreCard buySignal={buySignal} isLoading={loadingState.calculation} />
          </div>

          {/* Indicators Grid - Takes full width on mobile, 2 columns on xl */}
          <div className="xl:col-span-2">
            <IndicatorGrid indicators={indicators} isLoading={loadingState.indicators} />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="glassmorphism rounded-xl p-6 text-center">
          <div className="text-yellow-400 text-2xl mb-2">⚡</div>
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="text-yellow-400">Important Disclaimer:</strong> This is not financial advice. 
            Bitcoin is highly volatile and risky. The analysis is based on current data and technical indicators, 
            but markets can change rapidly. Watch for changes over the next 1-4 weeks and always do your own research 
            before making any investment decisions.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>
            Data provided by CoinGecko API and Alternative.me Fear & Greed Index
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;