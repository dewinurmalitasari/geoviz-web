import {api} from "@/lib/api-client.ts";
import {
    API_ENDPOINTS,
    type StatisticResponse,
    type StatisticsPayload,
    type StatisticsResponse,
    type StatisticsSummaryResponse
} from "@/type.ts";

export const statisticsService = {
    recordStatistic: (statisticData: StatisticsPayload): Promise<StatisticResponse> => {
        return api.post<StatisticResponse>(API_ENDPOINTS.statistics.base, statisticData);
    },

    getStatistics: (userId: string): Promise<StatisticsResponse> => {
        return api.get<StatisticsResponse>(API_ENDPOINTS.statistics.withId(userId));
    },

    getStatisticsSummary: (userId: string): Promise<StatisticsSummaryResponse> => {
        return api.get<StatisticsSummaryResponse>(API_ENDPOINTS.statistics.summaryWithId(userId));
    },
};