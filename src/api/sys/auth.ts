import { ISAuthUser } from '@/types/model/request/sys'
import { IRCode, IRLogin } from '@/types/model/response/sys'
import { encrypt } from '@/utils/rsaEncrypt'
import { get, post } from '../'

const prefixUrl = '/auth'

// 验证码
export const code = (): Promise<IRCode> => {
  return get(`${prefixUrl}/code`)
}

// 用户登录
export const login = (loginCheck: ISAuthUser): Promise<IRLogin> => {
  const sendData: ISAuthUser = JSON.parse(JSON.stringify(loginCheck))
  // 密码加密
  sendData.password = encrypt(sendData.password)
  return post(`${prefixUrl}/login`, sendData)
}
