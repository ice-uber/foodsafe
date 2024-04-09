import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import router from './router' // 引入路由器


const app = createApp(App)

app.use(ElementPlus) // 全引入elmentPlus组件
app.use(router) // 使用路由器

app.mount('#app')
