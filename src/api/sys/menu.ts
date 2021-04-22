import { IMenu } from '@/types/model/entity/sys'
import { get, IPageResponse } from '..'

const prefixUrl = '/api/menus'

// 获取权限菜单
export const buildMenus = (): Promise<IMenu[]> => {
  return get(`${prefixUrl}/build`)
}

// 获取菜单树
export const getMenus = (pid: string): Promise<IPageResponse<IMenu>> => {
  return get(prefixUrl, { pid })
}
