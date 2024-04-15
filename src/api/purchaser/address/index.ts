//统一管理咱们项目order相关的接口
import request from '@/utils/request'

// 项目地址相关的请求地址
enum API {
  ADDRESS_LIST_URL = '/foodsafe/address/list',
  ADDRESS_INFO_URL = '/foodsafe/address/info/',
}

// 获取地址列表
export const reqAddressList = () => request.get(API.ADDRESS_LIST_URL)

// 获取地址详细信息
export const reqAddressInfo = (data) => request.get(API.ADDRESS_INFO_URL + data)

