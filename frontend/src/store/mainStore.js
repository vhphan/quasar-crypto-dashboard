import {defineStore} from 'pinia';
import {apiGetCandles, apiGetTopCoins, apiGetTopGainers24Hours} from "@/api/apiCalls.js";

export const useMainStore = defineStore({
    id: 'mainStore',
    state: () => ({
        topGainers24Hours: [],
        topCoins: [],
        candles: []
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
        }
    },
    getters: {

    }
});