// src/router/title.ts
import type { Router } from 'vue-router'

const DEFAULT_TITLE = 'Supermarket'

export function setupTitleGuard(router: Router) {
    router.afterEach((to) => {
        document.title = to.meta.title
            ? `${to.meta.title} - ${DEFAULT_TITLE}`
            : DEFAULT_TITLE
    })
}