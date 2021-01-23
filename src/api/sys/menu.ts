import { get } from '..'

const prefixUrl = 'api/menus'

// 获取权限菜单
export const buildMenus = (): Promise<any> => {
  return get(`${prefixUrl}/build`)
}
