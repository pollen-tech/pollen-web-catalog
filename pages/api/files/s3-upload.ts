import multer from 'multer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import type { NodeRouter } from 'next-connect/dist/types/node'
import { s3Service } from '~/lib/s3'
import ApiError from '~/utils/error'
import { config as cfg } from '~/config'
import awaitToError from '~/utils/awaitToError'

interface UploadRequest {
  path: string
}

type RequestWithFile = NextApiRequest & { file: Express.Multer.File }

const router = createRouter<RequestWithFile, NextApiResponse>()
const fileProcess = multer()

const s3Svc = s3Service(cfg.aws.s3.bucket)

router.use(
  fileProcess.single('file') as unknown as NodeRouter<
    RequestWithFile,
    NextApiResponse
  >
)
router.post(async (req, res) => {
  const body: UploadRequest = req.body as UploadRequest
  const file = req.file
  const path = body.path
  if (!file) throw new ApiError('file is required', 400)
  const [err] = await awaitToError(
    s3Svc.uploadFile(file.buffer, `${cfg.environment}/${path}`)
  )
  if (err) {
    throw new ApiError(err.message)
  }

  res.send({ path })
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default router.handler({
  onError: (err, req, res) => {
    console.log(err)
    if (err instanceof ApiError) {
      res.status(err.statusCode as number).send(err.message)
    }
    res.status(500).send('internal server error')
  },
})
