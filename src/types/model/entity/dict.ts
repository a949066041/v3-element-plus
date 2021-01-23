import { IDictDetail } from './dictDetail'

export interface IDict {
  id: number;
  dictDetails: IDictDetail[];
  name: string;
  description: string;
}
