const needle = require('needle');
const {logger} = require("#src/middlewares/logger");
const fetch = require('node-fetch');

const Binance = require('node-binance-api');
const axios = require("axios");
const fs = require("fs");
const binance = new Binance().options({
    APIKEY: process.env.BINANCE_API_KEY,
    APISECRET: process.env.BINANCE_API_SECRET,
});
const isDev = process.env.NODE_ENV === 'development';

const index = (req, res) => {
    res.json({
        message: 'Welcome to the v1 API',
    });
};
const devModeStaticApi = (req, res, next) => {
    try {
        const currentPath = req.url;
        const jsonFileName = () => {
            switch (currentPath) {
                case '/topGainers24Hours':
                    return '24hPriceChange.json';
                case '/topCoins':
                    return 'topCoins.json';
                case '/getCandles':
                    return 'candles.json';
                case '/getExchangeInfo':
                    return 'exchangeInfo.json';
                default:
                    return false;
            }
        };
        if (!jsonFileName()) next();
        const jsonFile = global.__appDir + '/data/' + jsonFileName();
        if (fs.existsSync(jsonFile)) {
            const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
            logger.info(`returning data from ${jsonFile}`);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }
    } catch (e) {
        logger.error(e);
        next(e);
    }
};

const topGainers24Hours = async (req, res) => {

    // use axios to fetch https://api.binance.com/api/v3/ticker/24hr
    const url = 'https://api.binance.com/api/v3/ticker/24hr';
    logger.info(`fetching data from ${url}`);
    const data = (await axios.get(url)).data;

    const sortedData = data.sort((a, b) => {
            return b["priceChangePercent"] - a["priceChangePercent"];
        }
    );
    res.json({
        data: sortedData.slice(0, 50),
        success: true,
    });
};

const topCoins = (req, res) => {

    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1';
    logger.info(`fetching data from ${url}`);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(coin => {
                const name = coin.name;
                const symbol = coin.symbol;
                const pcChange = coin.price_change_percentage_24h;
                console.log(`${name} ${symbol} ${pcChange}`);
            });
            return res.json(
                {
                    data,
                    success: true,
                }
            );

        })
        .catch(error => logger.error(error));
};

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const convertBinanceKlineToCandles = (candlesticks) => {
    return candlesticks.map(candlestick => {
        const [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = candlestick;
        return {
            time: new Date(parseInt(time)).toUTCString(),
            open,
            high,
            low,
            close,
            volume,
            closeTime,
            assetVolume,
            trades,
            buyBaseVolume,
            buyAssetVolume,
            ignored
        };
    });
};

const getCandles = (req, res) => {

    const symbol = req.query.symbol;
    const interval = req.query.interval;
    const limit = req.query.limit;

    // use default values if not provided or equals 'undefined'
    const symbolToUse = symbol || 'BTCUSDT';
    const intervalToUse = interval || '1h';
    const limitToUse = limit || 500;

    binance.candlesticks(symbolToUse, intervalToUse, (error, ticks, symbol) => {
        let last_tick = ticks[ticks.length - 1];
        let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
        if (error) {
            logger.error(error);
            return res.json(
                {
                    data: [],
                    success: false,
                    message: error,
                }
            );
        }
        return res.json(
            {
                data: convertBinanceKlineToCandles(ticks),
                success: true,
                meta: {
                    symbol,
                    interval: intervalToUse,
                    limit: limitToUse,
                }
            }
        );
    }, {limit: limitToUse});
};

const getExchangeInfo = (req, res) => {
    binance.exchangeInfo((error, data) => {
        if (error) {
            logger.error(error);
            return res.json(
                {
                    data: [],
                    success: false,
                    message: error,
                }
            );
        }
        return res.json(
            {
                data,
                success: true,
            }
        );
    });
}

module.exports = {
    index,
    topGainers24Hours,
    topCoins,
    getCandles,
    devModeStaticApi,
    getExchangeInfo
};