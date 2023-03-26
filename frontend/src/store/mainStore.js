import {defineStore} from 'pinia';
import {apiGetTopGainers24Hours} from "@/api/apiCalls.js";

export const useMainStore = defineStore({
    id: 'mainStore',
    state: () => ({
        topGainers24Hours: [],
    }),
    actions: {
        async fetchTopGainers24Hours() {
            this.topGainers24Hours = await apiGetTopGainers24Hours();
        }
    },
    getters: {

    }
});