import { NextApiRequest, NextApiResponse } from 'next'
import { fetchCatalogDetail } from '../../../../src/services/catalogs'
import { parseOffer } from '../../../../src/services/offers'
import { handler } from './parse-excel'
import {
  ID_TOKEN_COOKIE_KEY,
  USER_CLAIMS_BUYER_PROFILE_COOKIE_KEY,
} from '../../auth/constant'

type RequestWithFile = NextApiRequest & { file: Express.Multer.File }

jest.mock('../../../../src/services/catalogs', () => ({
  fetchCatalogDetail: jest.fn().mockImplementation(() => {}),
}))
jest.mock('../../../../src/services/offers', () => ({
  parseOffer: jest.fn().mockImplementation(() => {
    return [
      {
        sku: 'XXXX',
        selfLifeRemainingDay: 365,
        totalUnit: 10,
        offerPrice: 3,
        isListed: true,
        batchId: 'XXXX',
        offerUnit: 10,
      },
    ]
  }),
}))
jest.mock('../../../../src/utils/arrayObject', () => ({
  parseUsingHeader: jest.fn().mockImplementation(() => {}),
}))
jest.mock('../../../../src/lib/s3', () => ({
  s3Service: jest.fn().mockImplementation(() => ({
    uploadFile: jest.fn().mockImplementation(() => {}),
  })),
}))
jest.mock('node-xlsx', () => ({
  parse: jest.fn().mockImplementation(() => []),
}))

const mockJwt =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODkyOTg2NTMsImV4cCI6MjE0NzQ4MzY0NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImJ1eWVyUHJvZmlsZSI6InsgXCJlbWFpbFwiOiBcImVjaGFvZW9lbkBnbWFpbC5jb21cIiB9In0.gTWmFsuzNKxeJMp_sviwPpfZjn_xsCzR_1XLhDjMPR8'
const mockBuyerCookie =
  '{"id":"auth0|64a7b8379d26ee7e1403ffaf","firstname":"User Firstname","lastname":"User Laststname","email":"user@gmail.com"}'

describe('pages/api/catalogs/[catalogId]/parse-excel.spec.ts', () => {
  let req: RequestWithFile
  let res: NextApiResponse
  let next: jest.Mock

  beforeEach(() => {
    req = {
      url: '/api/catalogs/123/parse-excel',
      method: 'POST',
      file: { path: 'path/to/file' },
      headers: {},
      query: { catalogId: '123' },
      cookies: {
        [ID_TOKEN_COOKIE_KEY]: mockJwt,
        [USER_CLAIMS_BUYER_PROFILE_COOKIE_KEY]: mockBuyerCookie,
      },
    } as unknown as RequestWithFile
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as NextApiResponse
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe(`.handler()`, () => {
    it('should handle POST request and return "hello" message', async () => {
      await handler.run(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalled()
    })

    it('should handle non-POST request and return "Method not allowed" error', async () => {
      req.method = 'GET'
      await handler.run(req, res)

      expect(res.status).toHaveBeenCalledWith(405)
      expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' })
    })

    it('should return file is required error when no file is attached', async () => {
      req.method = 'POST'
      await handler.run(
        { ...req, file: undefined } as unknown as RequestWithFile,
        res
      )

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith({ message: 'file is required' })
    })

    it('should return unauthorized when billing cookie is not exists', async () => {
      req.method = 'POST'
      await handler.run(
        {
          ...req,
          cookies: {
            ...req.cookies,
            [USER_CLAIMS_BUYER_PROFILE_COOKIE_KEY]: undefined,
          },
        } as unknown as RequestWithFile,
        res
      )

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalledWith({ message: 'Unauthorized' })
    })

    it('should return unauthorized when billing cookie is not exists', async () => {
      ;(fetchCatalogDetail as jest.Mock).mockRejectedValue(() => {
        throw new Error('Catalog not found')
      })
      req.method = 'POST'
      await handler.run(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith({ message: 'bad request' })
    })

    it('should return bad request error when offer excel parse is not pass', async () => {
      ;(fetchCatalogDetail as jest.Mock).mockResolvedValue(() => {
        return {
          id: '123',
          name: 'catalog name',
          description: 'catalog description',
          catalogType: 'catalog type',
          catalogStatus: 'catalog status',
          catalogItems: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      })
      ;(parseOffer as jest.Mock).mockRejectedValue('validation error')
      req.method = 'POST'
      await handler.run(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith({ message: 'validation error' })
    })
  })
})
