// src/types/statistics.ts
export interface StatisticsOverview {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
}

export interface StatisticsByCategory {
    categoryId: number;
    categoryName: string;
    totalSales: number;
    totalQuantity: number;
    percentage: number;
}

export interface DateRangeParams {
    startDate: Date;
    endDate: Date;
}