import { IUser } from '../entity/sys'

export interface IRCode {
  img: string;
  uuid: string;
}

export interface IRLogin {
  token: string;
  user: IUser;
}
