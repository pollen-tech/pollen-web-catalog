import multer from 'multer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import xlsx from 'node-xlsx'
import type { NodeRouter } from 'next-connect/dist/types/node'
import { s3Service } from '~/lib/s3'
import ApiError from '~/utils/error'
import { config as cfg } from '~/config'
import awaitToError from '~/utils/awaitToError'
import { parseUsingHeader } from '~/utils/arrayObject'
import {
  ID_TOKEN_COOKIE_KEY,
  USER_CLAIMS_BUYER_PROFILE_COOKIE_KEY,
} from '../../auth/constant'
import { fetchCatalogDetail } from '~/services/catalogs'
import { parseOffer } from '~/services/offers'
import { getRequestCookie } from '~/utils/cookie'
import type { User } from '~/@types/user'

type RequestWithFile = NextApiRequest & { file?: Express.Multer.File }

const router = createRouter<RequestWithFile, NextApiResponse>()
const fileProcess = multer({
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB
    files: 1,
  },
})

const s3Svc = s3Service(cfg.aws.s3.bucket)

router
  .use(
    fileProcess.single('file') as unknown as NodeRouter<
      RequestWithFile,
      NextApiResponse
    >
  )
  .post(async (req, res) => {
    const cookies = req.cookies
    const { catalogId } = req.query
    const file = req.file
    if (!file) {
      res.status(400).send({ message: 'file is required' })
      return
    }

    let user = null
    try {
      user = getRequestCookie<User>(
        req,
        USER_CLAIMS_BUYER_PROFILE_COOKIE_KEY as string
      )
    } catch (error) {}

    let err = null,
      parsed = null,
      catalog = null
    if (!user) {
      res.status(401).send({ message: 'Unauthorized' })
      return
    }

    // get buyer
    const buyerEmail = user.email
    ;[err, catalog] = await awaitToError(
      fetchCatalogDetail(catalogId as string, {
        idToken: cookies[ID_TOKEN_COOKIE_KEY] as string,
      })
    )
    if (err) {
      res.status(400).send({ message: 'bad request' })
      return
    }

    const workSheetsFromBuffer = xlsx.parse(file.buffer)
    const rawData = workSheetsFromBuffer
      .find((d) => d.name === 'Catalog')
      ?.data.slice(3)
    const parsedBody = parseUsingHeader(rawData as string[][])

    // check parsing offer excel data
    ;[err, parsed] = await awaitToError(parseOffer(catalog, parsedBody))
    if (err) {
      res.status(400).send({ message: err })
      return
    }

    const catalogFile = `catalogs/${catalogId as string}/offers/${buyerEmail}/${
      file.originalname
    }`

    ;[err] = await awaitToError(
      s3Svc.uploadFile(file.buffer, `${cfg.environment}/${catalogFile}`)
    )
    if (err) {
      res.status(400).send({ message: err })
    }

    res.status(200).send({
      catalogFile,
      offers: parsed,
    })
  })
  .all((req, res) => {
    res.status(405).json({
      error: 'Method not allowed',
    })
  })

export const config = {
  api: {
    bodyParser: false,
  },
}

export const handler = router

export default router.handler({
  onError: (err, req, res) => {
    if (err instanceof ApiError) {
      res.status(err.statusCode as number).send(err.message)
    }
    res.status(500).send('internal server error')
  },
})
