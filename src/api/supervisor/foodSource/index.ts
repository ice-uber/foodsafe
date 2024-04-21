//统一管理咱们项目用户相关的接口
import request from '@/utils/request'
//项目监管者食品溯源相关的请求地址
enum API {
  SUPERVISOR_LIST_URL = '/foodsafe/supervisor/list',
  PURCHASER_LIST_URL = '/foodsafe/purchaser/list',
}

//订单列表接口
export const reqSupervisorList = (params) => request.get(API.SUPERVISOR_LIST_URL, { params })

// 获取所有的采购商信息
export const reqPurchaserList = () => request.get(API.PURCHASER_LIST_URL)
