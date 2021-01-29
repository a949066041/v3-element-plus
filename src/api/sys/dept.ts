import { IJob } from '@/types/model/entity/sys'
import { cacheAction, IPageResponse } from '../'

const prefixUrl = 'api/dept'

// 获取部门树 cache
export const getCacheDept = (pid?: string) => cacheAction<IPageResponse<IJob>>(prefixUrl, { pid })
