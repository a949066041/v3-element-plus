import { ISAuthUser } from '@/types/model/request/sys'
import { IRCode } from '@/types/model/response/sys'

export interface ILoginState {
  formInfo: ISAuthUser;
  loginDisabled: boolean;
  codeInfo: IRCode;
}
