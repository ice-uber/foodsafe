//统一管理咱们项目order相关的接口
import request from '@/utils/request'

// 项目order相关的请求地址
enum API {
  GOODS_COUNT_URL = '/foodsafe/goods/count/',
  GOODS_LIST_URL = '/foodsafe/goods/list/',
}

// 获取订单列表
export const reqGoodsCount = (data) => request.get(API.GOODS_COUNT_URL + data)

// 获取配送商下的商品列表
export const reqGoodsList = (data, params) => request.get(API.GOODS_LIST_URL + data, { params })
