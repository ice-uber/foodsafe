import { defineStore } from 'pinia'

export const useShoppingCartStore = defineStore('order', {
  state: () => {
    return {
      params: {
        page: 1,
        limit: 10,
        key: '',
        total: '',
        status: "0"
      },
      goodsList: [],
      goodsArr: []
    }
  },
  actions: {
  },
  getters: {},
})
