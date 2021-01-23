import { IStoreUser } from '@/types/store/user'
import { getToken } from '@/utils/cookie'

const states: IStoreUser = {
  token: getToken(),
  userInfo: {},
  menus: []
}

export default states
