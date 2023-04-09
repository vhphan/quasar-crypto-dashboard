# Interactive Cryptocurrency Dashboard

![Web UI Snapshot](/_img/Capture.JPG)

This is a dashboard that shows:
- A table of top cryptocurrencies by market cap
- The daily candlestick chart of user selected trading pairs
- The top news related to selected coin

User can select coin from the table and the dashboard will update the chart and news accordingly.
User can also select the trading pair for selected coin from the dropdown menu and the dashboard will update the chart accordingly.
The top news is updated with the selected coin.

APIs used:
- CoinGecko API (for coin data)
- Binance API (for trading pair candlestick data)
- CryptoPanic API (for news)

## Getting Started
Backend written in Node.js and Express.js.
- cd ./backend
- npm install
- npm start

Frontend written in Vue.js.
- cd ./frontend
- npm install
- npm start
