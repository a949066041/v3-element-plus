import { IMenu } from '@/types/model/entity/menu'
import { get } from '..'

const prefixUrl = 'api/menus'

// 获取权限菜单
export const buildMenus = (): Promise<IMenu[]> => {
  return get(`${prefixUrl}/build`)
}
