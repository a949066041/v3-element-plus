import { Dispatch, Commit } from 'vuex'

export interface ICtx<T> {
  dispatch: Dispatch;
  commit: Commit;
  state: T;
}
