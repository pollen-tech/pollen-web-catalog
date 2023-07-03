import { createProxyMiddleware } from 'http-proxy-middleware'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { config } from '~/config'

export const proxy = createProxyMiddleware({
  target: config.marketingUrl,
  headers: {},
  changeOrigin: true,
  autoRewrite: true,
}) as unknown as (req: NextApiRequest, res: NextApiResponse) => void
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.headers.cookie = ''
  proxy(req, res)
}
