// src/router/progress.ts
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    showSpinner: false,
    minimum: 0.3
})

export function setupProgress(router: Router) {
    router.beforeEach(() => {
        NProgress.start()
    })

    router.afterEach(() => {
        NProgress.done()
    })
}