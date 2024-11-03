// src/types/dashboard.ts
export interface DashboardStats {
    overview: StatisticsOverview;
    recentOrders: OrderResponse[];
    topProducts: ProductResponse[];
    salesByCategory: StatisticsByCategory[];
    revenueChart: ChartData;
}

export interface InventoryAlert {
    product: Product;
    currentStock: number;
    minimumStock: number;
    status: 'LOW' | 'OUT_OF_STOCK';
}