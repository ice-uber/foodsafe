//统一管理咱们项目order相关的接口
import request from '@/utils/request'

// 项目客户相关的请求地址
enum API {
  PUSCHASER_LIST_URL = '/foodsafe/cooperation/list/puschaser',
  UNCOOPERATION_LIST_URL = '/foodsafe/cooperation/list/unCooperation',
  APPLY_URL = '/foodsafe/cooperation/apply/',
  UNAPPLY_URL = '/foodsafe/cooperation/unApply/',
}

// 获取配送商客户列表
export const reqPurchaserList = (data) => request.get(API.PUSCHASER_LIST_URL, { params: data })

// 获取还未合作的客户列表
export const reqUnCooperationList = () => request.get(API.UNCOOPERATION_LIST_URL)

// 申请合作
export const reqApply = (id) => request.get(API.APPLY_URL + id)

// 取消申请合作
export const requnApply = (id) => request.get(API.UNAPPLY_URL + id)