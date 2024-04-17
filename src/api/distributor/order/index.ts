//统一管理咱们项目order相关的接口
import request from '@/utils/request'

// 项目order相关的请求地址
enum API {
  ORDER_LIST_URL = '/foodsafe/order/list',
  ACCEPT_OR_UNACCEPT_URL = '/foodsafe/order/accept/',
  ORDER_OUT_URL = '/foodsafe/order/out/',
  ORDER_GOODS_URL = '/foodsafe/order/goods/',
  ORDER_GOODS_SOURCE_URL = '/foodsafe/order/source',
  ORDER_OUT_LIST_URL = '/foodsafe/order/out/list',
  ORDER_FINISH_URL = '/foodsafe/order/finish/'

}

// 获取订单列表
export const reqOrderList = (data) => request.get(API.ORDER_LIST_URL, { params: data })


// 确认受理订单
export const reqAcceptOrUnacceptOrder = (data) => request.get(API.ACCEPT_OR_UNACCEPT_URL + data)

// 确认订单出库
export const reqOrderOut = (data) => request.get(API.ORDER_OUT_URL + data)

//订单批量出库
export const reqOrderOutList = (data) => request.post(API.ORDER_OUT_LIST_URL, data)

// 获取订单下商品list
export const reqGoodsList = (data) => request.get(API.ORDER_GOODS_URL + data)

// 更新订单下的商品来源
export const reqSaveOrderGoodsSourceOrBacthGoodsSource = (data) => request.post(API.ORDER_GOODS_SOURCE_URL, data)

// 订单完成
export const reqFinishOrder = (data) => request.post(API.ORDER_FINISH_URL + data)
