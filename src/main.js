import { createApp } from 'vue'
import './style.css'
import './reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import pinia from '@/stores'

import router from './router' // 引入路由器

// main.js:注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(ElementPlus) // 全引入elmentPlus组件
app.use(router) // 使用路由器
app.use(pinia)

app.mount('#app')
