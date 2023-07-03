import { createProxyMiddleware } from 'http-proxy-middleware'
import { type NextApiRequest, type NextApiResponse } from 'next'

export const proxy = createProxyMiddleware({
  target: 'https://market.pollen.tech',
  headers: {},
  changeOrigin: true,
  autoRewrite: true,
}) as unknown as (req: NextApiRequest, res: NextApiResponse) => void
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.headers.cookie = ''
  proxy(req, res)
}
