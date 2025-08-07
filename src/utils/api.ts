export interface BitcoinPrice {
  usd: number;
  usd_24h_vol: number;
  usd_24h_change?: number;
}

export interface OHLCData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface FearGreedData {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update?: string;
}

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const FEAR_GREED_API = 'https://api.alternative.me/fng/';

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchBitcoinPrice(): Promise<{ price: BitcoinPrice; volumes: number[] }> {
  try {
    const response = await fetch(
      `${COINGECKO_BASE}/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true`
    );

    if (!response.ok) {
      throw new APIError(`Failed to fetch Bitcoin price: ${response.status}`, response.status);
    }

    const data = await response.json();
    
    if (!data.bitcoin) {
      throw new APIError('Invalid response format from CoinGecko');
    }

    const priceData = data.bitcoin;
    
    const volumesResponse = await fetch(
      `${COINGECKO_BASE}/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily`
    );
    
    let volumes: number[] = [];
    if (volumesResponse.ok) {
      const volumeData = await volumesResponse.json();
      volumes = volumeData.total_volumes?.map((v: [number, number]) => v[1]) || [];
    }

    return {
      price: {
        usd: priceData.usd,
        usd_24h_vol: priceData.usd_24h_vol,
        usd_24h_change: priceData.usd_24h_change
      },
      volumes
    };
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(`Network error fetching Bitcoin price: ${error}`);
  }
}

export async function fetchOHLCData(days: number = 30): Promise<OHLCData[]> {
  try {
    const response = await fetch(
      `${COINGECKO_BASE}/coins/bitcoin/ohlc?vs_currency=usd&days=${days}`
    );

    if (!response.ok) {
      throw new APIError(`Failed to fetch OHLC data: ${response.status}`, response.status);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new APIError('Invalid OHLC data format from CoinGecko');
    }

    return data.map((candle: number[]) => ({
      timestamp: candle[0],
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4]
    }));
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(`Network error fetching OHLC data: ${error}`);
  }
}

export async function fetchFearGreedIndex(): Promise<{ value: number; classification: string }> {
  try {
    const response = await fetch(FEAR_GREED_API);

    if (!response.ok) {
      throw new APIError(`Failed to fetch Fear & Greed Index: ${response.status}`, response.status);
    }

    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new APIError('Invalid Fear & Greed data format');
    }

    const currentData = data.data[0];
    
    return {
      value: parseInt(currentData.value),
      classification: currentData.value_classification
    };
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(`Network error fetching Fear & Greed Index: ${error}`);
  }
}

export async function fetchAllBitcoinData() {
  try {
    const [priceData, ohlcData, fearGreedData] = await Promise.all([
      fetchBitcoinPrice(),
      fetchOHLCData(30),
      fetchFearGreedIndex()
    ]);

    return {
      price: priceData.price,
      volumes: priceData.volumes,
      ohlc: ohlcData,
      fearGreed: fearGreedData
    };
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(`Failed to fetch Bitcoin data: ${error}`);
  }
}

export const API_RATE_LIMITS = {
  coingecko: {
    requestsPerMinute: 50,
    requestsPerHour: 1000
  },
  fearGreed: {
    requestsPerMinute: 10,
    requestsPerHour: 100
  }
} as const;