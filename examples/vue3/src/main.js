import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { domHandler } from 'common-toolbox'
import App from './App.vue'
import axios from './utils/axios'
import router from './router'
import { setToken } from './utils/cookie'

domHandler.setFontSize()

// test cookieAndStorage
setToken('456780')

const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(createPinia())
app.use(router)

app.mount('#app')
