import AuthLayout from '@/layouts/AuthLayout.vue';
import { ROUTE_NAMES } from '../constants';

export default {
    path: '/auth',
    component: AuthLayout,
    children: [
        {
            path: 'login',
            name: ROUTE_NAMES.LOGIN,
            component: () => import('@/views/auth/LoginPage.vue'),
            meta: {
                title: 'Đăng nhập'
            }
        },
        {
            path: 'register',
            name: ROUTE_NAMES.REGISTER,
            component: () => import('@/views/auth/RegisterPage.vue'),
            meta: {
                title: 'Đăng ký'
            }
        },
        {
            path: 'forgot-password',
            name: ROUTE_NAMES.FORGOT_PASSWORD,
            component: () => import('@/views/auth/ForgotPasswordPage.vue'),
            meta: {
                title: 'Quên mật khẩu'
            }
        },
        {
            path: 'reset-password',
            name: ROUTE_NAMES.RESET_PASSWORD,
            component: () => import('@/views/auth/ResetPasswordPage.vue'),
            meta: {
                title: 'Đặt lại mật khẩu'
            }
        }
    ]
};