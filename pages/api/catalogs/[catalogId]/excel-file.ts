import { type NextApiRequest, type NextApiResponse } from 'next'
import { getCookie } from 'cookies-next'
import { ID_TOKEN_COOKIE_KEY } from '../../auth/constant'
import { config } from '~/config'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = getCookie(ID_TOKEN_COOKIE_KEY, { req, res })
  const path = req.url as string
  if (!cookie?.toString()) {
    return res.redirect(`/api/auth/login?returnTo=/${path}`)
  }
  // amplify does not support s3 reverse proxy,
  // for now use the plain redericion
  // should be changed in the future
  const catalogId = req.query.catalogId as string
  res.setHeader(`API_KEY`, config.lms.apiKey)
  res.redirect(`${config.lms.endpoint}/catalogs/export-data/${catalogId}`)
}
