import MainLayout from '@/layouts/MainLayout.vue';
import { ROUTE_NAMES } from '../constants';

export default {
    path: '/',
    component: MainLayout,
    children: [
        {
            path: '',
            name: ROUTE_NAMES.HOME,
            component: () => import('@/views/HomePage.vue'),
            meta: {
                title: 'Trang chủ'
            }
        },
        {
            path: 'products',
            name: ROUTE_NAMES.PRODUCTS,
            component: () => import('@/views/ProductsPage.vue'),
            meta: {
                title: 'Sản phẩm'
            }
        },
        {
            path: 'cart',
            name: ROUTE_NAMES.CART,
            component: () => import('@/views/CartPage.vue'),
            meta: {
                title: 'Giỏ hàng'
            }
        },
        {
            path: 'checkout',
            name: ROUTE_NAMES.CHECKOUT,
            component: () => import('@/views/CheckoutPage.vue'),
            meta: {
                requiresAuth: true,
                title: 'Thanh toán'
            }
        },
        {
            path: 'profile',
            name: ROUTE_NAMES.PROFILE,
            component: () => import('@/views/ProfilePage.vue'),
            meta: {
                requiresAuth: true,
                title: 'Thông tin cá nhân'
            }
        },
        {
            path: 'orders',
            name: ROUTE_NAMES.ORDERS,
            component: () => import('@/views/OrdersPage.vue'),
            meta: {
                requiresAuth: true,
                title: 'Đơn hàng'
            }
        },
        {
            path: 'orders/:id',
            name: ROUTE_NAMES.ORDER_DETAIL,
            component: () => import('@/views/OrderDetailPage.vue'),
            meta: {
                requiresAuth: true,
                title: 'Chi tiết đơn hàng'
            }
        }
    ]
};