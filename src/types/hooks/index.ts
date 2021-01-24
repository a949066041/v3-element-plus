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
