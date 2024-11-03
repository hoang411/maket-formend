// src/router/guards.ts
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTE_NAMES } from './constants';

export const authGuard = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiredRoles = to.matched.find(record => record.meta.roles)?.meta?.roles as string[] | undefined;

    if (requiresAuth && !authStore.isAuthenticated) {
        next({
            name: ROUTE_NAMES.LOGIN,
            query: { redirect: to.fullPath }
        });
        return;
    }

    if (requiredRoles && !requiredRoles.includes(authStore.userRole || '')) {
        next({ name: 'not-found' });
        return;
    }

    if (authStore.isAuthenticated && to.path.startsWith('/auth')) {
        next({ name: ROUTE_NAMES.HOME });
        return;
    }

    next();
};