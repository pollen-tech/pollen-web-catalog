import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export interface RequestContext {
  cookies: ReadonlyRequestCookies
}
