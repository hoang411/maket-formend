// src/services/statistics.service.ts
import type {
    StatisticsOverview,
    StatisticsByCategory,
    DateRangeParams
} from '@/types';

export const statisticsService = {
    async getOverview(params: DateRangeParams): Promise<StatisticsOverview> {
        return api.get('/statistics/statisticsOverview', { params });
    },

    async getStatisticsByCategory(params: DateRangeParams): Promise<StatisticsByCategory[]> {
        return api.get('/statistics/statisticsByCategory', { params });
    }
};