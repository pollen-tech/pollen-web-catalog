import { type NextApiResponse, type NextApiRequest } from 'next'
import handler from './excel-file'
var getCookieMock: NonNullable<string>
jest.mock('./proxy', () => {
  return {
    proxy: jest.fn().mockImplementation((req, res, next) => {}),
  }
})
jest.mock('cookies-next', () => ({
  getCookie: jest.fn().mockImplementation(() => getCookieMock),
}))

const redirectMock = jest.fn()
const response = {
  redirect: redirectMock,
  status: () => ({
    end: () => {
      // do nothing
    },
  }),
} as unknown as NextApiResponse

describe('pages/api/catalogs/[catalog_id]/excel-file.ts', () => {
  describe(`.handler()`, () => {
    const request: NextApiRequest = {
      url: 'api/catalogs/1/excel-file',
      query: {
        catalog_id: '1',
      } as Record<string, string>,
    } as NextApiRequest
    it(`should redirect to /api/auth/login when session cookie does not present`, () => {
      handler(request, response)
      expect(redirectMock).toBeCalledWith(
        '/api/auth/login?returnTo=/api/catalogs/1/excel-file'
      )
    })
    it(`should call proxy when session cookie presents`, () => {
      getCookieMock = 'test'
      handler(request, response)
    })
  })
})
