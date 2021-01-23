
export interface IItemConfig {
  dataIndex?: string;
  label: string;
  slots?: boolean;
  config?: {
    [key: string]: any;
  };
  time?: boolean;
}
