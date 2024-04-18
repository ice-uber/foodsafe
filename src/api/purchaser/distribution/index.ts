//统一管理咱们项目order相关的接口
import request from '@/utils/request'

// 项目配送商相关的请求地址
enum API {
  DISTRIBUTION_LIST_URL = '/foodsafe/distribution/list',
}

// 获取配送商列表
export const reqDistributionList = (params) => request.get(API.DISTRIBUTION_LIST_URL, { params })


