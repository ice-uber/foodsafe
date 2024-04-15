//统一管理咱们项目order相关的接口
import request from '@/utils/request'

// 项目相关的请求地址
enum API {
  UOLOAD_URL = '/admin/common/upload',
}

// 获取订单列表
export const reqUpload = (data) => request.post(API.UOLOAD_URL, data, { headers: { 'Content-Type': 'multipart/form-data' } })

