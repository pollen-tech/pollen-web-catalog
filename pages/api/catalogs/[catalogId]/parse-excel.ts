/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseOffer } from '~/services/offers'
import { parseUsingHeader } from '~/utils/arrayObject'
import awaitToError from '~/utils/awaitToError'
import { ID_TOKEN_COOKIE_KEY } from '../../auth/constant'
import { fetchCatalogDetail } from '~/services/catalogs'
import ApiError from '~/utils/error'
import { decode } from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, body, query, cookies } = req
    const allowedMethod = ['POST']
    if (method == 'POST') {
      const catalogId = query.catalogId
      const { data } = body
      const parsedBody = parseUsingHeader(data)
      const idToken = cookies[ID_TOKEN_COOKIE_KEY]

      let err = null,
        parsed = null,
        catalog = null
      if (!idToken) throw new ApiError('Unauthorized', 401)

      // decode idToken
      const decoded = decode(idToken) as { buyerProfile: string }
      if (!decoded) throw new ApiError('Unauthorized', 401)

      // get buyer
      const buyer = JSON.parse(decoded.buyerProfile)
      const buyerId = buyer.buyer.id
      ;[, catalog] = await awaitToError(
        fetchCatalogDetail(catalogId as string, {
          idToken: idToken,
        })
      )

      // check parsing offer excel data
      ;[err, parsed] = await awaitToError(parseOffer(catalog, parsedBody))
      if (err) throw new ApiError(JSON.stringify(err), 400)

      res.status(200).send({
        catalogFile: `/catalogs/${catalogId as string}/offers/${
          buyerId as string
        }`,
        offers: parsed,
      })
    } else {
      res.setHeader('Allow', allowedMethod)
      res.status(405).end(`Method ${method ?? ''} Not Allowed`)
    }
  } catch (error: any) {
    if (error instanceof ApiError) {
      res
        .status(error.statusCode as number)
        .send({ message: JSON.parse(error.message) })
    }
    res.status(error.code).send({ message: error.message })
  }
}
