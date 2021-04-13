import { IJob } from '@/types/model/entity/sys'
import { cacheAction, IPageResponse } from '..'

// 获取岗位
export const getAllJob = () => {
  const params = {
    page: 0,
    size: 9999,
    enabled: true
  }
  return cacheAction<IPageResponse<IJob>>('/api/job', params)
}
