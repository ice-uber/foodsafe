//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 项目用户信息相关的请求地址
enum API {
  USER_INFO_DETAIL = '/system/user/info/detail',
  SAVE_COMPANYMESSAGE = '/foodsafe/distribution/save',
  UPDATE_USER_INFO = '/system/user/update',

}

// 获取各类订单数量
export const reqUserInfoDetail = () => request.get(API.USER_INFO_DETAIL)

// 保存单位信息
export const reqSaveCompanyMessage = (data) => request.post(API.SAVE_COMPANYMESSAGE, data)

// 更新用户信息
export const reqUpdateUserInfo = (data) => request.post(API.UPDATE_USER_INFO, data)

