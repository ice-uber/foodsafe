//统一管理咱们项目order相关的接口
import request from '@/utils/request'

// 项目order相关的请求地址
enum API {
  CHECKOUT_URL = '/foodsafe/order/checkout',
}

// 结账
export const reqCheckout = (data) => request.post(API.CHECKOUT_URL, data)
