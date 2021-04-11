import { getCurrentInstance } from 'vue'

// 暴露方法
export const useExpose = (exposeObj: object) => {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(instance.proxy, exposeObj)
  }
}

// 获取父级暴露方法
export function useParent (): any {
  const instance = getCurrentInstance()
  return instance?.parent?.proxy
}

// 获取同级暴露方法
export const useBrother = () => {
  const instance = getCurrentInstance()
  return (instance as any).proxy
}
