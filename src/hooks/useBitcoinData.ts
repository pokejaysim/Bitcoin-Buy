import { useState, useCallback, useRef } from 'react';
import { fetchAllBitcoinData, APIError } from '../utils/api';
import { 
  calculateRSI, 
  calculateMACD, 
  calculateVolatility, 
  findSupportLevel, 
  calculateVolumeSpike,
  calculateScore
} from '../utils/calculations';
import { AppState, BitcoinData, MarketIndicators, BuySignal, LoadingState } from '../types';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useBitcoinData() {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    error: null,
    bitcoinData: null,
    indicators: null,
    buySignal: null,
    lastRefresh: 0
  });

  const [loadingState, setLoadingState] = useState<LoadingState>({
    price: false,
    indicators: false,
    calculation: false
  });

  const cacheRef = useRef<{ data: any; timestamp: number } | null>(null);
  const manualSettingsRef = useRef({
    sentimentPositive: false,
    macroPositive: false
  });

  const setManualSetting = useCallback((key: 'sentimentPositive' | 'macroPositive', value: boolean) => {
    manualSettingsRef.current[key] = value;
  }, []);

  const shouldUseCache = useCallback(() => {
    if (!cacheRef.current) return false;
    const now = Date.now();
    return (now - cacheRef.current.timestamp) < CACHE_DURATION;
  }, []);

  const processData = useCallback(async (rawData: any) => {
    try {
      setLoadingState(prev => ({ ...prev, calculation: true }));

      const closes = rawData.ohlc.map((candle: any) => candle.close);
      const volumes = rawData.volumes;
      
      const rsi = calculateRSI(closes, 14);
      const macd = calculateMACD(closes, 12, 26, 9);
      const volatility = calculateVolatility(closes, 30);
      const support = findSupportLevel(closes, 20);
      const volumeSpike = calculateVolumeSpike(volumes, 10);

      const bitcoinData: BitcoinData = {
        price: rawData.price.usd,
        volume24h: rawData.price.usd_24h_vol,
        change24h: rawData.price.usd_24h_change || 0,
        timestamp: Date.now()
      };

      const indicators: MarketIndicators = {
        rsi: {
          name: 'RSI (14)',
          value: rsi.value,
          status: rsi.signal === 'oversold' ? 'positive' : rsi.signal === 'overbought' ? 'negative' : 'neutral',
          points: rsi.signal === 'oversold' ? 2 : 0,
          maxPoints: 2,
          description: 'Relative Strength Index - measures momentum',
          signal: rsi.signal
        },
        macd: {
          name: 'MACD',
          value: `${macd.macd.toFixed(2)}`,
          status: macd.buy ? 'positive' : 'neutral',
          points: macd.buy ? 1 : 0,
          maxPoints: 1,
          description: 'Moving Average Convergence Divergence - trend indicator',
          signal: macd.buy ? 'bullish crossover' : 'no signal'
        },
        volatility: {
          name: 'Volatility',
          value: `${volatility.annualizedPercent}%`,
          status: volatility.isLow ? 'positive' : 'neutral',
          points: volatility.isLow ? 1 : 0,
          maxPoints: 1,
          description: 'Price volatility - lower is better for buying',
          signal: volatility.isLow ? 'low volatility' : 'high volatility'
        },
        support: {
          name: 'Support Level',
          value: `$${support.level.toLocaleString()}`,
          status: support.nearSupport ? 'positive' : 'neutral',
          points: support.nearSupport ? 1 : 0,
          maxPoints: 1,
          description: 'Price near support levels',
          signal: support.nearSupport ? 'near support' : 'above support'
        },
        fearGreed: {
          name: 'Fear & Greed',
          value: rawData.fearGreed.value,
          status: rawData.fearGreed.value < 40 ? 'positive' : 'neutral',
          points: rawData.fearGreed.value < 40 ? 2 : 0,
          maxPoints: 2,
          description: 'Market sentiment indicator',
          signal: rawData.fearGreed.classification
        },
        volume: {
          name: 'Volume Spike',
          value: volumeSpike.isSpike ? 'Yes' : 'No',
          status: volumeSpike.isSpike ? 'positive' : 'neutral',
          points: volumeSpike.isSpike ? 1 : 0,
          maxPoints: 1,
          description: 'Unusual trading volume activity',
          signal: volumeSpike.isSpike ? 'volume spike detected' : 'normal volume'
        },
        sentiment: {
          name: 'Sentiment',
          value: manualSettingsRef.current.sentimentPositive ? 'Positive' : 'Neutral',
          status: manualSettingsRef.current.sentimentPositive ? 'positive' : 'neutral',
          points: manualSettingsRef.current.sentimentPositive ? 1 : 0,
          maxPoints: 1,
          description: 'General market sentiment (manual setting)',
          signal: 'manual override'
        },
        macro: {
          name: 'Macro Factors',
          value: manualSettingsRef.current.macroPositive ? 'Positive' : 'Neutral',
          status: manualSettingsRef.current.macroPositive ? 'positive' : 'neutral',
          points: manualSettingsRef.current.macroPositive ? 1 : 0,
          maxPoints: 1,
          description: 'Macroeconomic conditions (manual setting)',
          signal: 'manual override'
        }
      };

      const scoreResult = calculateScore({
        rsi,
        macd,
        volatility,
        nearSupport: support.nearSupport,
        fearGreed: rawData.fearGreed.value,
        volumeSpike: volumeSpike.isSpike,
        sentimentPositive: manualSettingsRef.current.sentimentPositive,
        macroPositive: manualSettingsRef.current.macroPositive
      });

      const buySignal: BuySignal = {
        shouldBuy: scoreResult.shouldBuy,
        score: scoreResult.score,
        maxScore: 10,
        confidence: scoreResult.confidence,
        confidencePercentage: Math.round((scoreResult.score / 10) * 100),
        lastUpdated: Date.now()
      };

      return { bitcoinData, indicators, buySignal };

    } finally {
      setLoadingState(prev => ({ ...prev, calculation: false }));
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      setLoadingState({ price: true, indicators: true, calculation: false });

      let rawData;
      
      if (shouldUseCache()) {
        rawData = cacheRef.current!.data;
        setLoadingState({ price: false, indicators: false, calculation: false });
      } else {
        rawData = await fetchAllBitcoinData();
        cacheRef.current = {
          data: rawData,
          timestamp: Date.now()
        };
        setLoadingState(prev => ({ ...prev, price: false, indicators: false }));
      }

      const processedData = await processData(rawData);
      
      setState(prev => ({
        ...prev,
        ...processedData,
        isLoading: false,
        lastRefresh: Date.now()
      }));

    } catch (error) {
      console.error('Error fetching Bitcoin data:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof APIError ? error.message : 'Failed to fetch data'
      }));
      setLoadingState({ price: false, indicators: false, calculation: false });
    }
  }, [shouldUseCache, processData]);

  const refreshData = useCallback(async () => {
    cacheRef.current = null;
    await fetchData();
  }, [fetchData]);

  return {
    ...state,
    loadingState,
    fetchData,
    refreshData,
    setManualSetting,
    manualSettings: manualSettingsRef.current
  };
}