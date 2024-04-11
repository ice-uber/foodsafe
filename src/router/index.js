import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Login from '../pages/login/index.vue'
import DistributorIndex from '../pages/distributor/index/index.vue'
import PurchaserIndex from '../pages/purchaser/index/index.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/distributor',
      component: DistributorIndex,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: 'product',
          component: () => import('@/pages/distributor/index/product/index.vue'),
          meta: {
            title: '商品维护'
          },
        },
        {
          path: 'account',
          component: () => import('@/pages/distributor/index/account/index.vue'),
          meta: {
            title: '账号管理'
          },
        },
        {
          path: 'order',
          component: () => import('@/pages/distributor/index/order/index.vue'),
          meta: {
            title: '订单处理'
          },
        },
        {
          path: 'supplier',
          component: () => import('@/pages/distributor/index/supplier/index.vue'),
          meta: {
            title: '供货商管理'
          },
        },
        {
          path: 'statement_account',
          component: () => import('@/pages/distributor/index/statement_account/index.vue'),
          meta: {
            title: '对账单'
          },
        },
        {
          path: 'detection',
          component: () => import('@/pages/distributor/index/detection/index.vue'),
          meta: {
            title: '检测中心'
          },
        },
        {
          path: 'customer',
          component: () => import('@/pages/distributor/index/customer/index.vue'),
          meta: {
            title: '我的客户'
          },
        },
      ]
    },
    {
      path: '/purchaser',
      component: PurchaserIndex
    },
    {
      path: '/login',
      component: Login
    },
  ]
})
export default router