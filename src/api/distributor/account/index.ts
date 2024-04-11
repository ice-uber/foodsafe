//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 项目account相关的请求地址
enum API {
  USER_LIST_URL = '/system/user/list',
  GOODS_DETAIL_URL = '/foodsafe/goods/info/',
  GOODS_UPDATE_URL = '/foodsafe/goods/update',
  GOODS_UP_URL = '/foodsafe/goods/up/',
  GOODS_DOWN_URL = '/foodsafe/goods/down/',
  GOODS_DOWN_LIST_URL = '/foodsafe/goods/down/list',
  GOODS_UP_LIST_URL = '/foodsafe/goods/up/list',
  GOODS_SAVA_URL = '/foodsafe/goods/save',
}

// 获取子账号列表
export const reqChildrenList = (data) => request.get(API.USER_LIST_URL, { params: data })

// 获取商品详情
export const reqGoodsDetail = (data) => request.get(API.GOODS_DETAIL_URL + data)

// 更新商品详情
export const reqGoodsUpdate = (data) => request.post(API.GOODS_UPDATE_URL, data)

// 商品新增请求
export const reqGoodsUp = (data) => request.get(API.GOODS_UP_URL + data)

// 商品上架请求
export const reqGoodsSave = (data) => request.post(API.GOODS_SAVA_URL, data)


// 商品下架请求
export const reqGoodsDown = (data) => request.get(API.GOODS_DOWN_URL + data)


// 商品批量下架请求
export const reqGoodsDownList = (data) => request.post(API.GOODS_DOWN_LIST_URL, data)


// 商品批量上架请求
export const reqGoodsUpList = (data) => request.post(API.GOODS_UP_LIST_URL, data)