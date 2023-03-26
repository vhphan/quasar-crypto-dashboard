import {api} from "@/plugins/http.js";

// export const apiGetRegionalCountTrend = async () => {
//     const response = (await api.get(`/regionalCountTrend`)).data;
//     return response.data;
// };

export const apiGetTopGainers24Hours = async () => {
    const response = (await api.get(`/api/v1/topGainers24Hours`)).data;
    return response.data;
}
