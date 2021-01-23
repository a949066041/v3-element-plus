import { IStoreCommon, ISetCommonPayload } from '@/types/store/common'
import { SET_COMMON_DATA } from './actionTypes'

export default {
  [SET_COMMON_DATA] (state: IStoreCommon, payload: ISetCommonPayload) {
    state.commonData[payload.type] = payload.data
  }
}
