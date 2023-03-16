import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'


// eslint-disable-next-line no-unused-vars
import bootstrap from 'bootstrap/scss/bootstrap.scss'

const pinia = createPinia()
createApp(App).use(pinia).use(router).mount('#app')
