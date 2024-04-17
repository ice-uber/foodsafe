//统一管理咱们项目order相关的接口
import request from '@/utils/request'

// 项目order相关的请求地址
enum API {
  CHECKOUT_URL = '/foodsafe/order/checkout',
  PURCAHSER_ORDER_LIST_URL = '/foodsafe/order/list/purchaser',
  ORDER_COUNT = '/foodsafe/order/count',
  UPDATE_ORDER_URL = '/foodsafe/order/update',
  ORDER_RECEIVE_URL = '/foodsafe/order/receive',
}

// 结账
export const reqCheckout = (data) => request.post(API.CHECKOUT_URL, data)


// 获取当前采购商下的订单列表
export const reqPurchaserOrderList = (data) => request.get(API.PURCAHSER_ORDER_LIST_URL, { params: data })

// 获取各类订单数量
export const reqOrderCount = () => request.get(API.ORDER_COUNT)

// 更新订单状态
export const reqUpdateOrder = (data) => request.post(API.UPDATE_ORDER_URL, data)

// 订单签收
export const reqOrderReceive = (data) => request.post(API.ORDER_RECEIVE_URL, data)
