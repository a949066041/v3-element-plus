import { IMenu, IUser } from '@/types/model/entity/sys'
import { IStoreUser } from '@/types/store/user'
import { setToken, removeToken } from '@/utils/cookie'
import { SET_MENUS, SET_TOKEN, SET_USER_INFO } from './actionTypes'

export default {
  [SET_TOKEN] (state: IStoreUser, payload: string): void {
    if (payload) {
      setToken(payload)
    } else {
      state.token = ''
      removeToken()
    }
  },
  [SET_USER_INFO] (state: IStoreUser, payload: IUser): void {
    state.userInfo = payload
  },
  [SET_MENUS] (state: IStoreUser, payload: IMenu[]): void {
    state.menus = payload
  }
}
