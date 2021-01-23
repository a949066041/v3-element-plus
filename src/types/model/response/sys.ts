import { IUser } from '../entity/user'

export interface IRCode {
  img: string;
  uuid: string;
}

export interface IRLogin {
  token: string;
  user: IUser;
}
