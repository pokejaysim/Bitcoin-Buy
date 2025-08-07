export interface Indicator {
  name: string;
  value: string | number;
  status: 'positive' | 'negative' | 'neutral';
  points: number;
  maxPoints: number;
  description: string;
  signal?: string;
}

export interface BitcoinData {
  price: number;
  volume24h: number;
  change24h: number;
  timestamp: number;
}

export interface MarketIndicators {
  rsi: Indicator;
  macd: Indicator;
  volatility: Indicator;
  support: Indicator;
  fearGreed: Indicator;
  volume: Indicator;
  sentiment: Indicator;
  macro: Indicator;
}

export interface BuySignal {
  shouldBuy: boolean;
  score: number;
  maxScore: number;
  confidence: 'High' | 'Medium' | 'Low';
  confidencePercentage: number;
  lastUpdated: number;
}

export interface AppState {
  isLoading: boolean;
  error: string | null;
  bitcoinData: BitcoinData | null;
  indicators: MarketIndicators | null;
  buySignal: BuySignal | null;
  lastRefresh: number;
}

export interface RefreshButtonProps {
  onRefresh: () => void;
  isLoading: boolean;
  lastUpdated?: number;
}

export interface IndicatorCardProps {
  indicator: Indicator;
  isLoading?: boolean;
}

export interface ScoreCardProps {
  buySignal: BuySignal | null;
  isLoading?: boolean;
}

export interface PriceHeaderProps {
  bitcoinData: BitcoinData | null;
  isLoading?: boolean;
}

export interface ProgressBarProps {
  current: number;
  max: number;
  status: 'positive' | 'negative' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

export interface LoadingState {
  price: boolean;
  indicators: boolean;
  calculation: boolean;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  timestamp: number;
}

export type IndicatorKey = keyof MarketIndicators;

export interface IndicatorConfig {
  key: IndicatorKey;
  name: string;
  description: string;
  maxPoints: number;
  calculation: (data: any) => { value: string | number; points: number; status: 'positive' | 'negative' | 'neutral'; signal?: string };
}