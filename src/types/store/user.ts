import { IMenu } from '../model/entity/menu'

export interface IStoreUser {
  token: string | undefined;
  userInfo: any;
  menus: IMenu[];
}
