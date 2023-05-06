import { createApp } from 'vue'
import App from './App.vue'
import { dateHandler, domHandler, browserHandler, validator } from 'common-toolbox'

console.log('date: ', dateHandler.getDateAndWeek());

console.log('browser-handler: ', browserHandler)

const mobile = '13345678901'
console.log('is mobile', validator.isMobile(mobile))

domHandler.setFontSize()

import './assets/main.css'

createApp(App).mount('#app')
