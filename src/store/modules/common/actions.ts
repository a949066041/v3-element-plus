import { ICtx } from '@/types/store'
import { IStoreCommon, ISetCommonPayload } from '@/types/store/common'
import { SET_COMMON_DATA } from './actionTypes'

export default {
  setCommonData ({ commit }: ICtx<IStoreCommon>, payload: ISetCommonPayload) {
    commit(SET_COMMON_DATA, payload)
  }
}
