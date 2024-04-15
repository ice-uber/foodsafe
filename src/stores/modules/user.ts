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
      role: '',
      companyName: '',
      distributionId: '',
      distributionCompanyName: '',
    }
  },
  actions: {
    async login(data: loginFormData) {
      const res: loginResponseData = await reqLogin(data)
      if (res.code === 200) {
        this.token = res.data
        localStorage.setItem('token', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userInfo() {
      const res = await reqUserInfo()
      if (res.code === 200) {
        const { userName, avatar, role, companyName, distributionId, distributionCompanyName } = res.data
        this.username = userName
        this.avatar = avatar
        this.role = role
        this.companyName = companyName
        this.distributionId = distributionId
        this.distributionCompanyName = distributionCompanyName
        return this.role;
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
        this.role = ''
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
