import { defineStore } from 'pinia'
export const useLayoutSettings = defineStore('layoutSetting', {
  state: () => {
    return {
      fold: false, //左侧菜单是否折叠
      refresh: false, //是否刷新组件
    }
  },
  actions: {
    setFold(value: boolean) {
      this.fold = value
    },
  },
})
