import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import global styles
import './assets/styles/main.css'

// Import UI components/plugins (nếu có)
import { setupComponents } from './plugins/components'
import { setupDirectives } from './plugins/directives'

// Create Vue app
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)

// Setup global components
setupComponents(app)

// Setup custom directives
setupDirectives(app)

// Mount app
app.mount('#app')