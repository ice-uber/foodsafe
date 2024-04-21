import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Login from '../pages/login/index.vue'
import DistributorIndex from '../pages/distributor/index.vue'
import PurchaserIndex from '../pages/purchaser/index.vue'


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
          path: 'userSet',
          component: () => import('@/pages/distributor/user/userset/index.vue'),
          meta: {
            title: '个人设置'
          },
        },
        {
          path: 'userInfo',
          component: () => import('@/pages/distributor/user/userinfo/index.vue'),
          meta: {
            title: '用户中心'
          },
        },
        {
          path: 'index',
          component: () => import('@/pages/distributor/index/index.vue'),
          meta: {
            title: '欢迎'
          },
        },
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
      component: PurchaserIndex,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: 'shopping',
          component: () => import('@/pages/purchaser/index/index.vue'),
          meta: {
            title: '购物'
          },

        },
        {
          path: 'distribution',
          component: () => import('@/pages/purchaser/distribution/index.vue'),
          meta: {
            title: '我的配送商'
          },
        }, {
          path: 'order',
          component: () => import('@/pages/purchaser/order/index.vue'),
          meta: {
            title: '我的订单'
          },
        }, {
          path: 'checkout',
          component: () => import('@/pages/purchaser/checkOut/index.vue'),
          meta: {
            title: '结账'
          },
        }, {
          path: 'checkoutSuccess',
          component: () => import('@/pages/purchaser/checkOutSuccess/index.vue'),
          meta: {
            title: '订购成功'
          },
        },

      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/supervisor',
      component: () => import('@/pages/supervisor/layout/index.vue'),
      meta: {
        title: '监管系统'
      },
      // redirect: '/supervisor/home',
      children: [
        {
          path: 'home',
          component: () => import('@/pages/supervisor/home/index.vue'),
          meta: {
            title: '欢迎'
          },
        },
        {
          path: 'foodSource',
          component: () => import('@/pages/supervisor/foodSource/index.vue'),
          meta: {
            title: '食材溯源'
          },
        }
      ]
    },
  ]
})
export default router