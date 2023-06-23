import { type NextApiResponse, type NextApiRequest } from 'next'
import { type NextResponse, type NextRequest } from 'next/server'
declare module 'http-proxy-middleware' {
  export declare function createProxyMiddleware(cfg: {
    target: string | undefined
    secure: boolean
    headers: Record<string, string>
    pathRewrite: Record<string, string>
  }): (
    req: NextRequest | NextApiRequest,
    res: NextResponse | NextApiResponse,
    cb: (err: Error) => void
  ) => void
}
