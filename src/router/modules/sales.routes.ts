// src/router/modules/sales.routes.ts
import AdminLayout from '@/layouts/AdminLayout.vue';
import { ROUTE_NAMES } from '../constants';

export default {
    path: '/sales',
    component: AdminLayout,
    meta: {
        requiresAuth: true,
        roles: ['SALES']
    },
    children: [
        {
            path: '',
            name: ROUTE_NAMES.SALES_DASHBOARD,
            component: () => import('@/views/sales/Dashboard.vue'),
            meta: {
                title: 'Bán hàng - Dashboard'
            }
        },
        {
            path: 'orders',
            name: ROUTE_NAMES.SALES_ORDERS,
            component: () => import('@/views/sales/orders/OrderManagement.vue'),
            meta: {
                title: 'Quản lý đơn hàng'
            }
        }
    ]
};