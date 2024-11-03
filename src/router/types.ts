// src/router/types.ts
import 'vue-router'
import type { ROUTE_NAMES } from './constants'

declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth?: boolean
        roles?: string[]
        title?: string
        layout?: string
        breadcrumb?: string
        hideMenu?: boolean
    }
}

export type RouteName = typeof ROUTE_NAMES[keyof typeof ROUTE_NAMES]

export interface BreadcrumbItem {
    title: string
    to?: RouteLocationRaw
}