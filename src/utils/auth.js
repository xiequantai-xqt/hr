import Cookies from 'js-cookie'

const TokenKey = 'hr_token'

export function getTokenCookie() {
  return Cookies.get(TokenKey)
}

export function setTokenCookie(token) {
  return Cookies.set(TokenKey, token)
}

export function removeTokenCookie() {
  return Cookies.remove(TokenKey)
}
