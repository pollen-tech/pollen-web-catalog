import {
  type AfterCallback,
  handleAuth,
  handleCallback,
  handleLogout,
  handleLogin,
} from '@auth0/nextjs-auth0'
import { setCookie, deleteCookie } from 'cookies-next'
export const ID_TOKEN_COOKIE_KEY = 'id_token'
const afterCallback: AfterCallback = (req, res, session) => {
  setCookie(ID_TOKEN_COOKIE_KEY, session.idToken, {
    req,
    res,
  })
  return session
}
export default handleAuth({
  async callback(req, res) {
    await handleCallback(req, res, { afterCallback })
  },
  async login(req, res) {
    await handleLogin(req, res, { returnTo: req.cookies.currentUrl, authorizationParams: { prompt: 'login' } })
  },
  async logout(req, res) {
    deleteCookie(ID_TOKEN_COOKIE_KEY, { req, res })
    await handleLogout(req, res)
  },
})
