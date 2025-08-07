import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-gray-400 text-lg">
          Our AI analyzes 8 key indicators to give you a simple buy/wait recommendation
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            📊
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">1. Data Collection</h3>
          <p className="text-gray-400">
            We gather real-time Bitcoin price, volume, and market sentiment data from trusted sources
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            🧠
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">2. Technical Analysis</h3>
          <p className="text-gray-400">
            8 proven indicators (RSI, MACD, Fear & Greed, etc.) are calculated and weighted
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            🎯
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">3. Simple Decision</h3>
          <p className="text-gray-400">
            You get a clear BUY or WAIT recommendation with confidence level
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl p-6 border border-orange-500/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <span className="text-2xl mr-3">💡</span>
          What Each Score Means
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-red-500/20 rounded-xl p-4 border border-red-500/30">
            <div className="font-semibold text-red-400 mb-2">0-3 Points: WAIT</div>
            <p className="text-gray-300">
              Market conditions aren't favorable. Consider waiting for better entry points.
            </p>
          </div>
          
          <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/30">
            <div className="font-semibold text-yellow-400 mb-2">4-5 Points: MAYBE</div>
            <p className="text-gray-300">
              Mixed signals. Good opportunity but with moderate confidence.
            </p>
          </div>
          
          <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
            <div className="font-semibold text-green-400 mb-2">6+ Points: BUY</div>
            <p className="text-gray-300">
              Strong buy signal! Multiple indicators align for favorable conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;