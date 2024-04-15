//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 项目用户信息相关的请求地址
enum API {
  ORDER_COUNT = '/foodsafe/order/count',

}

// 获取各类订单数量
export const reqOrderCount = () => request.get(API.ORDER_COUNT)

