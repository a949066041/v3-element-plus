export interface IUseTableOption {
  api: string;
  firstLoad?: boolean;
}

export interface IUseTableState<T> {
  total: number;
  dataSource: T[];
  loading: boolean;
  page: number;
  size: number;
  pagination: boolean;
  searchForm: {
    [key: string]: any;
  };
}

export interface IUseTable<T> {
  state: IUseTableState<T>;
  getTable: () => void;
  resetSearch: () => void;
  searchTable: () => void;
}
