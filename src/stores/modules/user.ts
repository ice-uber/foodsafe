import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { UserState } from '@/stores/modules/types/types'
import type { loginFormData, loginResponseData } from '@/api/user/type'

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      token: localStorage.getItem('token'),
      username: '',
      avatar: '',
    }
  },
  actions: {
    async login(data: loginFormData) {
      const res: loginResponseData = await reqLogin(data)
      if (res.code === 0) {
        this.token = res.data
        localStorage.setItem('token', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data))
      }
    },
    async userInfo() {
      const res = await reqUserInfo()
      if (res.code === 200) {
        const { name, avatar } = res.data
        this.username = name
        this.avatar = avatar
        return 'ok'
      } else {
        console.log(res)
        return Promise.reject(new Error(res.message))
      }
    },
    async logout() {
      const res = await reqLogout()
      if (res.code === 200) {
        this.username = ''
        this.avatar = ''
        this.token = ''
        localStorage.removeItem('token')
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  getters: {},
})
