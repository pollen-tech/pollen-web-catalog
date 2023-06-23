import { type NextApiRequest, type NextApiResponse } from 'next'
import { getCookie } from 'cookies-next'
import { ID_TOKEN_COOKIE_KEY } from '../../auth/constant'
import { proxy } from './proxy'

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
