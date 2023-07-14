import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { handler } from './parse-excel'
import { ID_TOKEN_COOKIE_KEY } from '../../auth/constant'

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
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODkyOTg2NTMsImV4cCI6MTcyMDgzNDY1MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImJ1eWVyUHJvZmlsZSI6InsgXCJlbWFpbFwiOiBcImVjaGFvZW9lbkBnbWFpbC5jb21cIiB9In0.OcnLtCXauGQ7ZRbmAW9CTjKT8_N8w_9G66HcdoAKLqo'

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
  })
})
