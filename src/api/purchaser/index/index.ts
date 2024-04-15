//统一管理咱们项目order相关的接口
import request from '@/utils/request'

// 项目order相关的请求地址
enum API {
  DISTRIBUTOR_LIST_URL = '/foodsafe/cooperation/list/distribution',
}

// 获取订单列表
export const reqDistributionList = () => request.get(API.DISTRIBUTOR_LIST_URL)
