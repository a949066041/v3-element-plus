export interface IUser {
  id: number;
  deptId: number;
  username: string;
  nickName: string;
  email: string;
  phone: string;
  gender: string;
  avatarName: string;
  avatarPath: string;
  password?: string;
  enabled: boolean;
  isAdmin?: boolean;
  roles: Array<any>;
  jobs: Array<any>;
}
