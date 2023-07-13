import multer from 'multer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler, createRouter } from 'next-connect'
import xlsx from 'node-xlsx'
import type { NodeRouter } from 'next-connect/dist/types/node'
import { s3Service } from '~/lib/s3'
import ApiError from '~/utils/error'
import { config as cfg } from '~/config'
import awaitToError from '~/utils/awaitToError'
import { parseUsingHeader } from '~/utils/arrayObject'
import { ID_TOKEN_COOKIE_KEY } from '../../auth/constant'
import { decode } from 'jsonwebtoken'
import { fetchCatalogDetail } from '~/services/catalogs'
import { parseOffer } from '~/services/offers'

interface UploadRequest {
  path: string
}

type RequestWithFile = NextApiRequest & { file: Express.Multer.File }

const router = createRouter<RequestWithFile, NextApiResponse>()
const fileProcess = multer()

const s3Svc = s3Service(cfg.aws.s3.bucket)

router
  .use(
    fileProcess.single('file') as unknown as NodeRouter<
      RequestWithFile,
      NextApiResponse
    >
  )
  .post(async (req, res, next) => {
    const cookies = req.cookies
    const { catalogId } = req.query
    const file = req.file
    if (!file) {
      res.status(400).send({ message: 'file is required' })
      return
    }

    const idToken = cookies[ID_TOKEN_COOKIE_KEY]

    let err = null,
      parsed = null,
      catalog = null
    if (!idToken) {
      res.status(401).send({ message: 'Unauthorized' })
      return
    }

    // decode idToken
    const decoded = decode(idToken) as { buyerProfile: string }
    if (!decoded) {
      res.status(401).send({ message: 'Unauthorized' })
      return
    }

    // get buyer
    const buyer = JSON.parse(decoded.buyerProfile) as { email: string }
    const buyerEmail = buyer.email
    ;[, catalog] = await awaitToError(
      fetchCatalogDetail(catalogId as string, {
        idToken: idToken,
      })
    )

    const workSheetsFromBuffer = xlsx.parse(file.buffer)
    const rawData = workSheetsFromBuffer
      .find((d) => d.name === 'Catalog')
      ?.data.slice(3)
    const parsedBody = parseUsingHeader(rawData as string[][])

    // check parsing offer excel data
    ;[err, parsed] = await awaitToError(parseOffer(catalog, parsedBody))
    if (err) {
      res.status(400).send({ message: JSON.stringify(err) })
      return
    }

    const catalogFile = `catalogs/${catalogId as string}/offers/${buyerEmail}/${
      file.originalname
    }`

    ;[err] = await awaitToError(
      s3Svc.uploadFile(file.buffer, `${cfg.environment}/${catalogFile}`)
    )
    if (err) {
      res.status(400).send({ message: JSON.stringify(err) })
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

export default router.handler({
  onError: (err, req, res) => {
    if (err instanceof ApiError) {
      res.status(err.statusCode as number).send(err.message)
    }
    res.status(500).send('internal server error')
  },
})
