//统一管理咱们项目order相关的接口
import request from '@/utils/request'

// 项目客户相关的请求地址
enum API {
  PUSCHASER_LIST_URL = '/foodsafe/cooperation/list/puschaser',
}

// 获取配送商客户列表
export const reqPurchaserList = (data) => request.get(API.PUSCHASER_LIST_URL, { params: data })