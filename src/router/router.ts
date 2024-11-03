import {createRouter, createWebHistory} from "vue-router";
import publicRoutes from "@/router/modules/public.routes.ts";
import adminRoutes from "@/router/modules/admin.routes.ts";
import warehouseRoutes from "@/router/modules/warehouse.routes.ts";
import salesRoutes from "@/router/modules/sales.routes.ts";
import authRoutes from "@/router/modules/auth.routes.ts";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        publicRoutes,
        adminRoutes,
        warehouseRoutes,
        salesRoutes,
        authRoutes,
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFound.vue'),
            meta: {
                title: 'Không tìm thấy trang'
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return {top: 0}
    }
})
export default router;