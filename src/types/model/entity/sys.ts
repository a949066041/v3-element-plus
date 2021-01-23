export interface IDept {
  id: number;
  name: string;
  enabled: boolean;
  deptSort: number;
  children: IDept[];
  pid: number;
  subCount: number;
}

export interface IDict {
  id: number;
  dictDetails: IDictDetail[];
  name: string;
  description: string;
}

export interface IDictDetail {
  id: number;
  dictDetails: IDict;
  label: string;
  value: string;
  dictSort: number;
}

export interface IJob {
  id: number;
  name: string;
  jobSort: number;
  enabled: boolean;
}

export interface IMenu {
  id: number;
  children?: Array<IMenu>;
  type: number;
  permission: string;
  menuSort: number;
  path: string;
  component: string;
  pid: number;
  subCount: number;
  iFrame: boolean;
  cache: boolean;
  componentName: string;
  icon: string;
  meta?: {
    [key: string]: any;
  };
}

export interface IRole {
  id: number;
  name: string;
  level: number;
  description: string;
}

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
