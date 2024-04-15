//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 项目供应商相关的请求地址
enum API {
  SUPPLIER_LIST_BY_USER = '/foodsafe/supplier/list',
  SUPPLIER_LIST_PAGE_BY_USER = '/foodsafe/supplier/list/page',
  SUPPLIER_INFO = '/foodsafe/supplier/info/',
  SUPPLIER_UPDATE = '/foodsafe/supplier/update',
  SUPPLIER_SAVE = '/foodsafe/supplier/save',
}

// 根据用户获取供货商列表
export const reqSupplierByUser = () => request.get(API.SUPPLIER_LIST_BY_USER)

// 获取供应商详细信息
export const reqSupplierInfo = (data) => request.get(API.SUPPLIER_INFO + data)

// 根据用户获取供货商列表
export const reqSupplierPageByUser = (data) => request.get(API.SUPPLIER_LIST_PAGE_BY_USER, { params: data })

// 更新供应商详细信息
export const reqSupplierUpdate = (data) => request.post(API.SUPPLIER_UPDATE, data)

// 新增供应商详细信息
export const reqSupplierSave = (data) => request.post(API.SUPPLIER_SAVE, data)