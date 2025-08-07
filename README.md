# Bitcoin Buy Indicator

A modern, AI-powered Bitcoin buy indicator website that combines technical analysis with market sentiment to help identify potential buying opportunities.

![Bitcoin Buy Indicator](https://img.shields.io/badge/Bitcoin-Buy%20Indicator-F7931A?style=for-the-badge&logo=bitcoin)

## 🚀 Features

### Real-Time Analysis
- **Live Bitcoin Price**: Real-time price updates from CoinGecko API
- **Technical Indicators**: RSI, MACD, Volatility analysis
- **Market Sentiment**: Fear & Greed Index integration
- **Volume Analysis**: Spike detection and trends

### Scoring System
- **10-Point Scale**: Comprehensive scoring across 8 indicators
- **Confidence Levels**: High (6+), Medium (4-5), Low (0-3)
- **Buy Signal**: Clear buy/wait recommendations
- **Visual Progress**: Interactive progress bars and charts

### Modern Design
- **Dark Theme**: Bitcoin-themed with orange (#F7931A) accents
- **Glassmorphism**: Beautiful card-based layout with backdrop blur
- **Animations**: Smooth transitions and loading states
- **Responsive**: Mobile-first design that works on all devices

## 📊 Indicators

| Indicator | Max Points | Description |
|-----------|------------|-------------|
| **RSI** | 2 points | Oversold conditions (RSI < 30) |
| **MACD** | 1 point | Bullish crossover signals |
| **Support Level** | 1 point | Price near support levels |
| **Fear & Greed** | 2 points | Extreme fear (< 40) conditions |
| **Volume Spike** | 1 point | Unusual trading activity |
| **Volatility** | 1 point | Low volatility periods |
| **Sentiment** | 1 point | Manual market sentiment toggle |
| **Macro Factors** | 1 point | Manual macroeconomic assessment |

## 🛠️ Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom Bitcoin theme
- **Build Tool**: Create React App with CRACO
- **APIs**: CoinGecko, Alternative.me Fear & Greed Index
- **State Management**: React Hooks
- **Type Safety**: Full TypeScript implementation

## 🎯 Installation & Usage

### Prerequisites
- Node.js 16+ and npm

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd Bitcoin-Buy

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### Building for Production
```bash
npm run build
```

## 🔧 Configuration

### Manual Settings
The app includes manual toggles for:
- **Market Sentiment**: Factor in news, social media sentiment
- **Macro Factors**: Economic conditions, regulations, institutional adoption

### API Rate Limits
- **CoinGecko**: 50 requests/minute, 1000 requests/hour
- **Fear & Greed**: 10 requests/minute, 100 requests/hour

## 📈 Scoring Algorithm

The buy signal is calculated using this exact logic:

```typescript
let score = 0;
if (rsi < 30) score += 2;           // RSI oversold = 2 points
if (macd.buy) score += 1;           // MACD crossover = 1 point  
if (priceNearSupport) score += 1;   // Support level = 1 point
if (fearGreed < 40) score += 2;     // Extreme fear = 2 points
if (volumeSpike) score += 1;        // Volume spike = 1 point
if (lowVolatility) score += 1;      // Low volatility = 1 point
if (sentimentPositive) score += 1;  // Positive sentiment = 1 point
if (macroPositive) score += 1;      // Macro factors = 1 point

// Buy signal: score >= 4
// Confidence: High (6+), Medium (4-5), Low (0-3)
```

## ⚠️ Important Disclaimer

**This is not financial advice.** Bitcoin is highly volatile and risky. The analysis is based on current data and technical indicators, but markets can change rapidly. Always do your own research before making any investment decisions.

## 📝 License

This project is for educational purposes. Data provided by CoinGecko API and Alternative.me Fear & Greed Index.

## 🤝 Contributing

This is a demonstration project showcasing modern React development with real-time cryptocurrency analysis.

---

Built with ❤️ for the Bitcoin community
