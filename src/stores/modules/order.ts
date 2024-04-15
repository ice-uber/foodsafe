import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => {
    return {
      params: {
        page: 1,
        limit: 5,
        orderNo: '',
        purchaserName: '',
        startDate: '',
        endDate: '',
        status: "-1"
      },
      orderArr: []
    }
  },
  actions: {
  },
  getters: {},
})
