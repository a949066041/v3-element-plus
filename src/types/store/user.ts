import { IMenu } from '../model/entity/menu'
import { IUser } from '../model/entity/user'

export interface IStoreUser {
  token: string | undefined;
  userInfo: IUser | {};
  menus: IMenu[];
}
