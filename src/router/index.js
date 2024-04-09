import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/login/index.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
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