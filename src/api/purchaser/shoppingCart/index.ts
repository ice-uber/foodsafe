//统一管理咱们项目相关的接口
import request from '@/utils/request'

// 项目购物车相关的请求地址
enum API {
  SAVE_SHOPPINGCART_URL = '/foodsafe/shoppingcar/save',
  SHOPPINGCART_LIST_URL = '/foodsafe/shoppingcar/list/',
  REMOVE_SHOPPINGCART_LIST_URL = '/foodsafe/shoppingcar/list/remove/',
}

// 保存购物车
export const reqSaveShoppingCart = (data) => request.post(API.SAVE_SHOPPINGCART_URL, data)
// 获取购物车列表
export const reqShoppingCartList = (data) => request.get(API.SHOPPINGCART_LIST_URL + data)

// 清空购物车列表
export const reqRemoveShoppingCartList = (data) => request.delete(API.REMOVE_SHOPPINGCART_LIST_URL + data)