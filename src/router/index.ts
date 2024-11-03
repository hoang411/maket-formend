// src/router/index.ts
import {authGuard} from './guards'
import {setupProgress} from './progress'
import {setupTitleGuard} from './title'
import router from "@/router/router.ts";

// Setup guards
router.beforeEach(authGuard)

// Setup progress bar
setupProgress(router)

// Setup title management
setupTitleGuard(router)

