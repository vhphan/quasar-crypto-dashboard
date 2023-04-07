import {defineStore} from 'pinia';
import {
    apiGetCandles,
    apiGetCryptoNews, apiGetCryptoNewsDescription,
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
    }),
    actions: {
        async fetchTopGainers24Hours() {
            this.topGainers24Hours = await apiGetTopGainers24Hours();
        },
        async fetchTopCoins() {
            this.topCoins = (await apiGetTopCoins());
        },
        async fetchCandles() {
            this.candles = (await apiGetCandles('BTCUSDT', '1h', 500));
        },
        async fetchExchangeInfo() {
            this.exchangeInfo = (await apiGetExchangeInfo());
        },
        async fetchCryptoNews() {
            this.cryptoNews = (await apiGetCryptoNews());
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
        }

    },
    getters: {
        tradedSymbols: (state) => {
            return state.exchangeInfo.symbols?.filter(symbol => symbol.status === 'TRADING').map(d => d.symbol);
        },
        tradedSymbolsForCoin: (state) => {
            const coin = state.coin;
            return state.exchangeInfo.symbols?.filter(symbol => symbol.status === 'TRADING' && symbol.baseAsset === coin.toUpperCase()).map(d => d.symbol);
        },
        cryptoNewsDetails: (state) => {
            const promises = state.cryptoNews.map(news => {
                    return apiGetCryptoNewsDescription(news.url);
                }
            );
            return Promise.all(promises);
        }

    }
});