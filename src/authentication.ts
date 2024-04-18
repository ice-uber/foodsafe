// 路由鉴权配置文件
import router from '@/router'
import pinia from '@/stores'
import { useUserStore } from '@/stores/modules/user'
import { log } from 'console'
import { ElNotification } from 'element-plus'
import nprogress from 'nprogress'
const userStore = useUserStore(pinia)

// 路由跳转前 前置守卫
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  const token = userStore.token
  const username = userStore.username
  const role = userStore.role
  if (token) {
    // 如果token存在则代表已登录 此时禁止访问login页
    if (to.path === '/login') {
      role === '1' ? next({ path: '/purchaser' }) : next({ path: '/distributor' })
    } else {
      // 没有用户信息首先获取用户信息
      //    用户信息获取失败包括 1.客户端token被修改 2.token过期

      if (username) {
        // 如果有检查是不是访问首页 / 如果是根据角色重定向至对应界面
        if (to.path === '/' || '') {
          role === '1' ? next({ path: '/purchaser' }) : next({ path: '/distributor' })
        } else {
          next()
        }
      } else {
        // 如果没有则获取用户信息
        try {
          // 获取成功
          const role = await userStore.userInfo()

          if (to.path === '/' || '') {
            role === '1' ? next({ path: '/purchaser' }) : next({ path: '/distributor' })
          } else {
            next()
          }

        } catch (e) {
          // 用户信息获取失败
          ElNotification({
            type: 'error',
            message: '请重新登录',
          })
          await userStore.logout()
          next({ path: '/login', query: { redirect: to.path === 'distributor' || 'purchaser' ? '' : to.path } })
        }
      }
    }
  } else {
    // 如果未登录只能访问login
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path === 'distributor' || 'purchaser' ? '' : to.path } })
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})
