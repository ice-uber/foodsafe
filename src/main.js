import { createApp } from 'vue'
import './style.css'
// import './reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import pinia from '@/stores'
import 'animate.css' // 引入第三方动画库

import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 引入 elment plus国际化

import router from './router' // 引入路由器

// main.js:注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
}) // 全引入elmentPlus组件

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router) // 使用路由器

// 路由鉴权配置文件
import '@/authentication'

app.use(pinia)

app.mount('#app')
