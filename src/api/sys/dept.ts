import { cacheAction } from '../'

const prefixUrl = 'api/dept'

// 获取部门树 cache
export const getCacheDept = (pid?: string) => cacheAction(prefixUrl, { pid })
