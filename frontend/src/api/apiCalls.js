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

export const apiGetExchangeInfo = async () => {
    const response = (await api.get(`/api/v1/getExchangeInfo`)).data;
    return response.data;
}

export const apiGetCryptoNews = async (currencies) => {
    const currenciesString = currencies.map(currency => 'currencies[]='+ currency).join('&');
    const response = (await api.get(`/api/v1/getCryptoNews?${currenciesString}`)).data;
    return response.data;
}

export const apiGetCryptoNewsDescription = async (newsUrl, newsId) => {
    const response = (await api.get(`/api/v1/getCryptoNewsDescription?id=${newsId}&url=${newsUrl}`)).data;
    return response.data;
}


