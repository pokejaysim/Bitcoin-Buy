export interface RSIResult {
  value: number;
  signal: 'oversold' | 'overbought' | 'neutral';
}

export interface MACDResult {
  macd: number;
  signal: number;
  histogram: number;
  buy: boolean;
}

export interface VolatilityResult {
  value: number;
  annualizedPercent: number;
  isLow: boolean;
}

export function calculateRSI(closes: number[], period: number = 14): RSIResult {
  if (closes.length < period + 1) {
    return { value: 50, signal: 'neutral' };
  }

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = closes[i] - closes[i - 1];
    if (change > 0) {
      gains += change;
    } else {
      losses -= change;
    }
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period + 1; i < closes.length; i++) {
    const change = closes[i] - closes[i - 1];
    if (change > 0) {
      avgGain = (avgGain * (period - 1) + change) / period;
      avgLoss = (avgLoss * (period - 1)) / period;
    } else {
      avgGain = (avgGain * (period - 1)) / period;
      avgLoss = (avgLoss * (period - 1) - change) / period;
    }
  }

  const rs = avgGain / avgLoss;
  const rsi = 100 - (100 / (1 + rs));

  let signal: 'oversold' | 'overbought' | 'neutral' = 'neutral';
  if (rsi < 30) signal = 'oversold';
  else if (rsi > 70) signal = 'overbought';

  return { value: Number(rsi.toFixed(2)), signal };
}

function calculateEMA(values: number[], period: number): number[] {
  const ema = [];
  const multiplier = 2 / (period + 1);
  
  ema[0] = values[0];
  
  for (let i = 1; i < values.length; i++) {
    ema[i] = ((values[i] - ema[i - 1]) * multiplier) + ema[i - 1];
  }
  
  return ema;
}

export function calculateMACD(closes: number[], fast: number = 12, slow: number = 26, signal: number = 9): MACDResult {
  if (closes.length < slow) {
    return { macd: 0, signal: 0, histogram: 0, buy: false };
  }

  const fastEMA = calculateEMA(closes, fast);
  const slowEMA = calculateEMA(closes, slow);
  
  const macdLine = fastEMA.map((fast, i) => fast - slowEMA[i]);
  const signalLine = calculateEMA(macdLine.slice(slow - 1), signal);
  
  const currentMacd = macdLine[macdLine.length - 1];
  const currentSignal = signalLine[signalLine.length - 1];
  const histogram = currentMacd - currentSignal;
  
  const prevMacd = macdLine[macdLine.length - 2] || 0;
  const prevSignal = signalLine[signalLine.length - 2] || 0;
  
  const buy = prevMacd <= prevSignal && currentMacd > currentSignal;

  return {
    macd: Number(currentMacd.toFixed(4)),
    signal: Number(currentSignal.toFixed(4)),
    histogram: Number(histogram.toFixed(4)),
    buy
  };
}

export function calculateVolatility(closes: number[], period: number = 30): VolatilityResult {
  if (closes.length < period) {
    return { value: 0, annualizedPercent: 0, isLow: false };
  }

  const returns = [];
  for (let i = 1; i < closes.length; i++) {
    returns.push(Math.log(closes[i] / closes[i - 1]));
  }

  const recentReturns = returns.slice(-period);
  const mean = recentReturns.reduce((a, b) => a + b, 0) / recentReturns.length;
  
  const variance = recentReturns.reduce((acc, ret) => {
    return acc + Math.pow(ret - mean, 2);
  }, 0) / (recentReturns.length - 1);

  const dailyVolatility = Math.sqrt(variance);
  const annualizedVolatility = dailyVolatility * Math.sqrt(365);
  const annualizedPercent = annualizedVolatility * 100;
  
  const isLow = annualizedPercent < 60;

  return {
    value: Number(dailyVolatility.toFixed(6)),
    annualizedPercent: Number(annualizedPercent.toFixed(2)),
    isLow
  };
}

export function findSupportLevel(closes: number[], lookbackPeriod: number = 20): { level: number; nearSupport: boolean } {
  if (closes.length < lookbackPeriod) {
    return { level: Math.min(...closes), nearSupport: false };
  }

  const recentCloses = closes.slice(-lookbackPeriod);
  const currentPrice = closes[closes.length - 1];
  const minPrice = Math.min(...recentCloses);
  const supportLevel = minPrice;
  
  const threshold = 0.05;
  const nearSupport = (currentPrice - supportLevel) / supportLevel < threshold;

  return { level: supportLevel, nearSupport };
}

export function calculateVolumeSpike(volumes: number[], period: number = 10): { avgVolume: number; isSpike: boolean } {
  if (volumes.length < period + 1) {
    return { avgVolume: volumes[volumes.length - 1] || 0, isSpike: false };
  }

  const recentVolumes = volumes.slice(-period - 1, -1);
  const currentVolume = volumes[volumes.length - 1];
  const avgVolume = recentVolumes.reduce((a, b) => a + b, 0) / recentVolumes.length;
  
  const isSpike = currentVolume > avgVolume * 1.5;

  return { avgVolume, isSpike };
}

export function calculateScore(indicators: {
  rsi: RSIResult;
  macd: MACDResult;
  volatility: VolatilityResult;
  nearSupport: boolean;
  fearGreed: number;
  volumeSpike: boolean;
  sentimentPositive: boolean;
  macroPositive: boolean;
}): { score: number; confidence: 'High' | 'Medium' | 'Low'; shouldBuy: boolean } {
  let score = 0;

  if (indicators.rsi.signal === 'oversold') score += 2;
  if (indicators.macd.buy) score += 1;
  if (indicators.nearSupport) score += 1;
  if (indicators.fearGreed < 40) score += 2;
  if (indicators.volumeSpike) score += 1;
  if (indicators.volatility.isLow) score += 1;
  if (indicators.sentimentPositive) score += 1;
  if (indicators.macroPositive) score += 1;

  const shouldBuy = score >= 4;
  let confidence: 'High' | 'Medium' | 'Low' = 'Low';
  
  if (score >= 6) confidence = 'High';
  else if (score >= 4) confidence = 'Medium';

  return { score, confidence, shouldBuy };
}