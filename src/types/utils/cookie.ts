export interface ICookie {
  getToken: () => string | undefined
  setToken: (token: string, rememberMe?: boolean) => void
  removeToken: () => void
}
