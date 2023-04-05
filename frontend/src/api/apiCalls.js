import {api} from "@/plugins/http.js";

export const apiGetTopGainers24Hours = async () => {
    const response = (await api.get(`/api/v1/topGainers24Hours`)).data;
    return response.data;
}

export const apiGetTopCoins = async () => {
    const response = (await api.get(`/api/v1/topCoins`)).data;
    return response.data;
}

export const apiGetCandles = async (symbol, interval, limit) => {
    const response = (await api.get(`/api/v1/getCandles?symbol=${symbol}&interval=${interval}&limit=${limit}`)).data;
    return response.data;
}
