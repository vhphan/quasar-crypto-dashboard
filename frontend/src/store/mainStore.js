import {defineStore} from 'pinia';
import {
    apiGetCandles,
    apiGetCryptoNews,
    apiGetCryptoNewsDescription,
    apiGetExchangeInfo,
    apiGetTopCoins,
    apiGetTopGainers24Hours
} from "@/api/apiCalls.js";

export const useMainStore = defineStore({
    id: 'mainStore',
    state: () => ({
        topGainers24Hours: [],
        topCoins: [],
        candles: [],
        symbol: 'BTCUSDT',
        interval: '1h',
        limit: 500,
        coin: 'btc',
        exchangeInfo: {},
        cryptoNews: [],
        mode: 'light',
    }),
    actions: {
        async fetchTopGainers24Hours() {
            this.topGainers24Hours = await apiGetTopGainers24Hours();
        },
        async fetchTopCoins() {
            this.topCoins = (await apiGetTopCoins());
        },
        async fetchCandles() {
            this.candles = (await apiGetCandles(this.symbol, '1h', 500));
        },
        async fetchExchangeInfo() {
            this.exchangeInfo = (await apiGetExchangeInfo());
        },
        fetchCryptoNews: async function() {
            this.cryptoNews = (await apiGetCryptoNews([this.coin.toUpperCase()]));
        },

        setCoin(coin) {
            this.coin = coin;
        },
        setSymbol(symbol) {
            this.symbol = symbol;
        },

        setInterval(interval) {
            this.interval = interval;
        },

        setLimit(limit) {
            this.limit = limit;
        },
        getNewsDetails: async function(id) {
            const news = this.cryptoNews.results.find(news => news.id === id);
            console.log(news);
            return await apiGetCryptoNewsDescription(news.url, id);
        },

    },
    getters: {
        tradedSymbols: (state) => {
            return state.exchangeInfo.symbols?.filter(symbol => symbol.status === 'TRADING').map(d => d.symbol);
        },
        tradedSymbolsForCoin: (state) => {
            const coin = state.coin;
            let tradedSymbols = state.exchangeInfo.symbols?.filter(symbol => symbol.status === 'TRADING' && symbol.baseAsset === coin.toUpperCase()).map(d => d.symbol);
            if(!tradedSymbols) return [];
            if (!tradedSymbols.includes(state.symbol)) {
                let preferredSymbol = coin.toUpperCase() + 'USDT';
                state.symbol = tradedSymbols.includes(preferredSymbol) ? preferredSymbol : tradedSymbols[0];
            }
            return tradedSymbols;
        },
    }
});