//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 项目对账单相关的请求地址
enum API {
  ORDER_DETAIL_LIST_URL = '/foodsafe/orderdetail/list',
  ORDER_TOTAL_URL = '/foodsafe/orderdetail/total',
  PURCHASER_LIST_URL = '/foodsafe/distribution/cooperation/purchaser',

}

// 获取当前账号下的订单详情
export const reqOrderDetailsList = (data) => request.get(API.ORDER_DETAIL_LIST_URL, { params: data })

// 统计订单总数
export const reqTotal = () => request.get(API.ORDER_TOTAL_URL)

// 统计获取所有合作的采购商信息
export const reqPurchaserList = () => request.get(API.PURCHASER_LIST_URL)

