import { Ref } from 'vue'

export interface IUseTableOption {
  api: string;
}
export interface IUseTableSearchState {
  searchForm: { [key: string]: any };
  initForm: { [key: string]: any };
}

export interface IUseTableState<T> {
  total: number;
  dataSource: T[];
  loading: boolean;
  page: number;
  size: number;
  pagination: boolean;
}

export interface IUseTable<T> {
  state: IUseTableState<T>;
  search: IUseTableSearchState;
  getTable: () => void;
  resetSearch: () => void;
  searchTable: () => void;
}

export interface IUseTableModalState {
  formId?: string | number;
  visible: boolean;
}
export interface IUseTableModal {
  state: IUseTableModalState;
  openDialog: (formId?: string | number) => void;
}

export interface IUseModalState<T> {
  isAdd: boolean;
  formInfo: T;
  loading: boolean;
}

export interface IUseModal<T> {
  saveForm: () => void;
  toggleVisible: (val: boolean) => void;
  form: Ref<any>;
  state: IUseModalState<T>;
}
