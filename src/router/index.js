import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/login/index.vue'
import Index from '../pages/index/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/index',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Login
    },
    // {
    // 	path:'/about',
    // 	component:About
    // }
  ]
})
export default router