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

      let err = null,
        parsed = null,
        catalog = null

      ;[, catalog] = await awaitToError(
        fetchCatalogDetail(catalogId as string, {
          idToken: cookies[ID_TOKEN_COOKIE_KEY] as string,
        })
      )
      ;[err, parsed] = await awaitToError(parseOffer(catalog, parsedBody))
      if (err) throw new ApiError(JSON.stringify(err), 400)
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
