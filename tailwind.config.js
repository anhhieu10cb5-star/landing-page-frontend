module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4ADE80',  // green-400 - sáng, dễ nhìn
          hover: '#22C55E',
          dim: '#16A34A',
        },
        secondary: {
          DEFAULT: '#22C55E',
          hover: '#16A34A',
        },
      },
    },
  },
  plugins: [],
}