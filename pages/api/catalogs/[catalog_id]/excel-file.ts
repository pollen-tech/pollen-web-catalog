import { type NextApiRequest, type NextApiResponse } from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware' // @2.0.6
import { config } from '~/config'
import { getCookie } from 'cookies-next'
import { ID_TOKEN_COOKIE_KEY } from '../../auth/constant'

const proxy = createProxyMiddleware({
  target: config.lms.endpoint,
  secure: false,
  pathRewrite: {
    // change path proxy to the lms endpoint
    "api": ``,
  },
  headers: {
    API_KEY: config.lms.apiKey,
  },
})
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = getCookie(ID_TOKEN_COOKIE_KEY, { req, res })
  const path = req.url as string
  if (!cookie?.toString()) {
    return res.redirect(`/api/auth/login?returnTo=/${path}`)
  }

  proxy(req, res, (error: Error) => {
    res.status(500).end('Proxy Error')
    if (error) {
    }
  })
}
