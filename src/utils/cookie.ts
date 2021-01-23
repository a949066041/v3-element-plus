import Cookies from 'js-cookie'

const tokenCookieExpires = 1
const TOKEN_KEY = 'token'

export function getToken (): string | undefined {
  return Cookies.get(TOKEN_KEY)
}

export function setToken (token: string, rememberMe?: boolean): void {
  if (rememberMe) {
    Cookies.set(TOKEN_KEY, token, { expires: tokenCookieExpires })
  } else {
    Cookies.set(TOKEN_KEY, token)
  }
}

export function removeToken () {
  Cookies.remove(TOKEN_KEY)
}
