import { login as loginCheck, logout as userLogout, info } from '@/api/sys/auth'
import { ISAuthUser } from '@/types/model/request/sys'
import { ICtx } from '@/types/store'
import { IStoreUser } from '@/types/store/user'
import { SET_TOKEN, SET_USER_INFO } from './actionTypes'

export default {
  login ({ commit }: ICtx<IStoreUser>, form: ISAuthUser) {
    return new Promise((resolve, reject) => {
      loginCheck(form).then((res) => {
        commit(SET_TOKEN, res.token)
        commit(SET_USER_INFO, res.user.user)
        resolve(res.user)
      }).catch(reject)
    })
  },
  logout ({ commit }: ICtx<IStoreUser>) {
    return new Promise<void>((resolve, reject) => {
      userLogout().then(() => {
        commit(SET_TOKEN, '')
        commit(SET_USER_INFO, {})
        resolve()
      }).catch(reject)
    })
  },
  refreshUser ({ commit }: ICtx<IStoreUser>) {
    return new Promise<void>((resolve, reject) => {
      info().then((res) => {
        commit(SET_USER_INFO, res)
        resolve()
      }).catch(reject)
    })
  }
}
