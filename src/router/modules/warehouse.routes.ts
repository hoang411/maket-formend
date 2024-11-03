// src/router/modules/warehouse.routes.ts
import AdminLayout from '@/layouts/AdminLayout.vue';
import { ROUTE_NAMES } from '../constants';

export default {
    path: '/warehouse',
    component: AdminLayout,
    meta: {
        requiresAuth: true,
        roles: ['WAREHOUSE']
    },
    children: [
        {
            path: '',
            name: ROUTE_NAMES.WAREHOUSE_DASHBOARD,
            component: () => import('@/views/warehouse/Dashboard.vue'),
            meta: {
                title: 'Kho - Dashboard'
            }
        },
        {
            path: 'inventory',
            name: ROUTE_NAMES.WAREHOUSE_INVENTORY,
            component: () => import('@/views/warehouse/inventory/InventoryManagement.vue'),
            meta: {
                title: 'Quản lý kho'
            }
        },
        {
            path: 'receipts',
            name: ROUTE_NAMES.WAREHOUSE_RECEIPTS,
            component: () => import('@/views/warehouse/receipts/ReceiptManagement.vue'),
            meta: {
                title: 'Quản lý phiếu nhập'
            }
        }
    ]
};