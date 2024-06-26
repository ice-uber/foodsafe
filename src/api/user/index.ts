//统一管理咱们项目用户相关的接口
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from './type'
//项目用户相关的请求地址
enum API {
  LOGIN_URL = '/system/user/login',
  USERINFO_URL = '/system/user/info',
  LOGOUT_URL = '/system/user/logout',
}

//登录接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = (data) =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL, { params: data })
//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
