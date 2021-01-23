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
