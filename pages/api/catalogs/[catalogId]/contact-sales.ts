import { type NextApiRequest, type NextApiResponse } from 'next'
import CatalogDomain from '~/domain/catalog/catalog-domain'
import {
  USER_CLAIMS_BUYER_PROFILE_COOKIE_KEY,
  USER_CLAIMS_EMAIL_COOKIE_KEY,
} from '../../auth/constant'
import { getRequestCookie } from '~/utils/cookie'
import { type User } from '~/@types/user'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    !req.cookies[USER_CLAIMS_EMAIL_COOKIE_KEY] ||
    !req.cookies[USER_CLAIMS_BUYER_PROFILE_COOKIE_KEY]
  )
    return res.status(401)
  const { catalogId } = req.query
  const user = getRequestCookie<User>(req, USER_CLAIMS_BUYER_PROFILE_COOKIE_KEY)
  await CatalogDomain.getInstance().contactSales(catalogId as string, user)
  res.status(204).send('')
}
