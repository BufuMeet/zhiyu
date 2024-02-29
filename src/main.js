import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router/index.js'
import './assets/reset.css' //初始化页面样式

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
