// src/router/modules/admin.routes.ts
import AdminLayout from '@/layouts/AdminLayout.vue';
import { ROUTE_NAMES } from '../constants';

export default {
    path: '/admin',
    component: AdminLayout,
    meta: {
        requiresAuth: true,
        roles: ['ADMIN']
    },
    children: [
        {
            path: '',
            name: ROUTE_NAMES.ADMIN_DASHBOARD,
            component: () => import('@/views/admin/Dashboard.vue'),
            meta: {
                title: 'Quản trị - Dashboard'
            }
        },
        {
            path: 'products',
            name: ROUTE_NAMES.ADMIN_PRODUCTS,
            component: () => import('@/views/admin/products/ProductManagement.vue'),
            meta: {
                title: 'Quản lý sản phẩm'
            }
        },
        {
            path: 'products/create',
            name: 'admin-product-create',
            component: () => import('@/views/admin/products/ProductForm.vue'),
            meta: {
                title: 'Thêm sản phẩm mới'
            }
        },
        {
            path: 'products/:id/edit',
            name: 'admin-product-edit',
            component: () => import('@/views/admin/products/ProductForm.vue'),
            meta: {
                title: 'Chỉnh sửa sản phẩm'
            }
        },
        {
            path: 'orders',
            name: ROUTE_NAMES.ADMIN_ORDERS,
            component: () => import('@/views/admin/orders/OrderManagement.vue'),
            meta: {
                title: 'Quản lý đơn hàng'
            }
        },
        {
            path: 'users',
            name: ROUTE_NAMES.ADMIN_USERS,
            component: () => import('@/views/admin/users/UserManagement.vue'),
            meta: {
                title: 'Quản lý người dùng'
            }
        },
        {
            path: 'inventory',
            name: ROUTE_NAMES.ADMIN_INVENTORY,
            component: () => import('@/views/admin/inventory/InventoryManagement.vue'),
            meta: {
                title: 'Quản lý kho'
            }
        },
        {
            path: 'receipts',
            name: ROUTE_NAMES.ADMIN_RECEIPTS,
            component: () => import('@/views/admin/receipts/ReceiptManagement.vue'),
            meta: {
                title: 'Quản lý phiếu nhập'
            }
        },
        {
            path: 'partners',
            name: ROUTE_NAMES.ADMIN_PARTNERS,
            component: () => import('@/views/admin/partners/PartnerManagement.vue'),
            meta: {
                title: 'Quản lý đối tác'
            }
        }
    ]
};