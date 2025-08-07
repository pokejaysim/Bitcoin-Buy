import React, { useEffect } from 'react';
import { useBitcoinData } from '../../hooks/useBitcoinData';
import PriceHeader from '../PriceHeader/PriceHeader';
import ScoreCard from '../ScoreCard/ScoreCard';
import IndicatorGrid from '../IndicatorGrid/IndicatorGrid';
import RefreshButton from '../RefreshButton/RefreshButton';
import ManualControls from '../ManualControls/ManualControls';
import HowItWorks from '../HowItWorks/HowItWorks';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full text-center border border-white/20 shadow-2xl">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Connection Issue</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={refreshData}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center py-12 px-4">
          <div className="inline-flex items-center px-6 py-2 bg-orange-500/20 rounded-full mb-6 border border-orange-500/30">
            <span className="text-orange-400 text-sm font-medium">🚀 Live Bitcoin Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              Should I Buy
            </span>
            <br />
            <span className="text-white">Bitcoin?</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get instant buy/sell recommendations based on 8 powerful technical indicators 
            and real-time market sentiment analysis
          </p>

          <div className="flex justify-center mb-12">
            <RefreshButton 
              onRefresh={refreshData} 
              isLoading={isLoading}
              lastUpdated={buySignal?.lastUpdated}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12">
          {/* Current Price */}
          <div className="mb-8">
            <PriceHeader bitcoinData={bitcoinData} isLoading={loadingState.price} />
          </div>

          {/* Main Decision Card */}
          <div className="mb-12">
            <ScoreCard buySignal={buySignal} isLoading={loadingState.calculation} />
          </div>

          {/* How It Works Explanation */}
          <div className="mb-12">
            <HowItWorks />
          </div>

          {/* Technical Analysis */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Technical Analysis Breakdown</h2>
              <p className="text-gray-400 text-lg">
                Each indicator contributes points to the final recommendation
              </p>
            </div>
            <IndicatorGrid indicators={indicators} isLoading={loadingState.indicators} />
          </div>

          {/* Manual Controls */}
          <div className="mb-12 flex justify-center">
            <ManualControls 
              settings={manualSettings}
              onSettingChange={setManualSetting}
            />
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-500/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-yellow-500/20 shadow-xl">
            <div className="text-yellow-400 text-3xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Investment Disclaimer</h3>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
              This tool provides technical analysis for educational purposes only and is <strong>not financial advice</strong>. 
              Bitcoin is extremely volatile and high-risk. Past performance doesn't guarantee future results. 
              Always do your own research and never invest more than you can afford to lose.
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-500">
            <p className="mb-2">Data provided by CoinGecko API and Alternative.me Fear & Greed Index</p>
            <p className="text-sm">Built for educational purposes • Not financial advice</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;