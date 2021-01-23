import { login as loginCheck, logout as userLogout, info } from '@/api/sys/auth'
import { buildMenus } from '@/api/sys/menu'
import { ISAuthUser } from '@/types/model/request/sys'
import { ICtx } from '@/types/store'
import { IStoreUser } from '@/types/store/user'
import { SET_MENUS, SET_TOKEN, SET_USER_INFO } from './actionTypes'

export default {
  login ({ commit }: ICtx<IStoreUser>, form: ISAuthUser) {
    return new Promise<any>((resolve, reject) => {
      loginCheck(form).then((res) => {
        commit(SET_TOKEN, res.token)
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
  refreshUser ({ commit, dispatch }: ICtx<IStoreUser>) {
    return new Promise<void>((resolve, reject) => {
      info().then((res) => {
        commit(SET_USER_INFO, res)
        dispatch('generateRoutes').then(resolve)
      }).catch(reject)
    })
  },
  generateRoutes ({ commit }: ICtx<IStoreUser>) {
    return new Promise<void>((resolve, reject) => {
      buildMenus().then((menu) => {
        commit(SET_MENUS, menu)
        resolve()
      }).catch(reject)
    })
  }
}
