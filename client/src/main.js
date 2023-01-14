import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// eslint-disable-next-line no-unused-vars
import bootstrap from 'bootstrap/scss/bootstrap.scss'

createApp(App).use(router).mount('#app')
