export interface CookieRequestInterface {
  cookies: Partial<{ [key: string]: string }>
}

export const getRequestCookie = <T>(
  req: CookieRequestInterface,
  name: string
): T => {
  const cookie: string = req.cookies[name] as string
  if (!cookie) {
    throw new Error(`Cookie ${name} not found`)
  }
  return JSON.parse(cookie) as T
}
