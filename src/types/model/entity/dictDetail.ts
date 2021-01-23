import { IDict } from './dict'

export interface IDictDetail {
  id: number;
  dictDetails: IDict;
  label: string;
  value: string;
  dictSort: number;
}
