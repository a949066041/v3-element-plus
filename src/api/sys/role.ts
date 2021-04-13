import { IRole } from '@/types/model/entity/sys'
import { cacheAction, IPageResponse } from '../'

const prefixUrl = '/api/roles'

// 获取部门树 cache
export const getCacheRoles = () => cacheAction<IPageResponse<IRole>>(prefixUrl)
