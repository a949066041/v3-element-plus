import axios, { Method } from 'axios'
import { ElMessage as Message } from 'element-plus'
import { getToken } from '@/utils/cookie'
import store from '@/store'
import router from '@/router'
import { IStoreCommon } from '@/types/store/common'

const baseURL = process.env.VUE_APP_BASE_API

const service = axios.create({
  baseURL, // api 的 base_url
  withCredentials: false
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    // token携带
    if (token) {
      config.headers.Authorization = token
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Message.error(`请求拦截器${error}`)
    console.error(`请求拦截器${error}`)
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    let code = 0
    try {
      code = error.response.data.status
    } catch (e) {
      return Promise.reject(error)
    }
    if (code) {
      const errorMsg = error.response.data.message
      if (errorMsg !== undefined) {
        Message.error(errorMsg)
      }
      if (code === 401) {
        store.dispatch('user/logout').then(() => {
          router.push('/login')
        })
      }
    }
    return Promise.reject(error)
  }
)

const baseMethod = (
  method: Method,
  url: string,
  params?: object
): Promise<any> => {
  return new Promise((resolve, reject) => {
    service({
      method,
      url,
      params
    })
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const baseMethod2 = (
  method: Method,
  url: string,
  data?: object
): Promise<any> => {
  return new Promise((resolve, reject) => {
    service({ method, url, data })
      .then(resolve)
      .catch(reject)
  })
}

export const put = (url: string, data?: any) => baseMethod2('PUT', url, data)

export const post = (url: string, data?: any) => baseMethod2('POST', url, data)

export const get = (url: string, params?: object) =>
  baseMethod('GET', url, params)

export const deletes = (url: string, params?: object) =>
  baseMethod2('DELETE', url, params)

export const cacheAction = (url: string, params = {}): Promise<any> => {
  return new Promise((resolve, reject) => {
    const cacheKey = `${url}${JSON.stringify(params)}`
    if (((store.state as any).common as IStoreCommon).commonData[cacheKey]) {
      resolve(
        ((store.state as any).common as IStoreCommon).commonData[cacheKey]
      )
      return
    }
    get(url, params)
      .then(res => {
        store.dispatch('common/setCommonData', { type: cacheKey, data: res })
        resolve(res)
      })
      .catch(reject)
  })
}

export interface IPageResponse<T> {
  content: Array<T>;
  totalElements: number;
}

export default {
  put,
  post,
  get,
  deletes,
  cacheAction
}
