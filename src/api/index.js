import {
  post,
  get
} from './config'

// 个人身份认证
export const verifyId = params => post('/portal/user/document', params)
// 添加邮箱订阅
export const addEmail = params => post('/portal/add_email', params)
// 查询邮箱是否订阅
export const getEmail = params => get('/portal/email_info', params)