import {
  type AfterCallback,
  handleAuth,
  handleCallback,
  handleLogout,
  handleLogin,
} from '@auth0/nextjs-auth0'
import { setCookie, deleteCookie } from 'cookies-next'
import {
  ID_TOKEN_COOKIE_KEY,
  USER_CLAIMS_BUYER_PROFILE_COOKIE_KEY,
  USER_CLAIMS_EMAIL_COOKIE_KEY,
} from './constant'
const afterCallback: AfterCallback = (req, res, session) => {
  setCookie(ID_TOKEN_COOKIE_KEY, session.idToken, {
    req,
    res,
  })
  setCookie(USER_CLAIMS_EMAIL_COOKIE_KEY, session.user.email, { req, res })
  setCookie(USER_CLAIMS_BUYER_PROFILE_COOKIE_KEY, session.user.buyerProfile, {
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
    await handleLogin(req, res, {
      returnTo: (req.query.currentUrl as string) || req.cookies.currentUrl,
    })
  },
  async logout(req, res) {
    deleteCookie(ID_TOKEN_COOKIE_KEY, { req, res })
    await handleLogout(req, res)
  },
})
