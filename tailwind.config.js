module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bitcoin: {
          orange: '#F7931A',
          blue: '#00D4FF',
        },
        dark: {
          bg: '#1A1A1A',
          card: '#2A2A2A80',
          text: '#F5F5F5',
        },
        success: '#00FF88',
        warning: '#FFC107',
        danger: '#FF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Monaco', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'counter': 'counter 0.6s ease-out forwards',
        'fadeIn': 'fadeIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
}