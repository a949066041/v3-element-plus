import store from '@/store'
import { IStoreUser } from '@/types/store/user'
import { getToken } from '@/utils/cookie'
import router from './'

router.beforeEach(async (to, form, next) => {
  const isLoginName = to.name === 'Login'
  if (getToken()) {
    if (isLoginName) {
      next('/')
    } else {
      if (!Object.keys(((store.state as any).user as IStoreUser).userInfo).length) {
        await store.dispatch('user/refreshUser')
          .then(() => {
            next({ ...to, replace: true })
          }).catch(() => {
            store.dispatch('user/logout')
              .then(() => { router.push({ name: 'Login' }) })
          })
      } else {
        next()
      }
    }
  } else {
    if (isLoginName) {
      next()
    } else {
      next({
        name: 'Login',
        query: {
          redirect: to.path
        }
      })
    }
  }
})
