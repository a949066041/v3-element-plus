export interface IStoreCommon {
  commonData: {
    [key: string]: any;
  };
}

export interface ISetCommonPayload {
  type: string;
  data: any;
}
