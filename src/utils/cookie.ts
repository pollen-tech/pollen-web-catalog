import { type NextApiRequest } from 'next'

export const getRequestCookie = <T>(req: NextApiRequest, name: string): T => {
  const cookie: string = req.cookies[name] as string
  if (!cookie) {
    throw new Error(`Cookie ${name} not found`)
  }
  return JSON.parse(cookie) as T
}
