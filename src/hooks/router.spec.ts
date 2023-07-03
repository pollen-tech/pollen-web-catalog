import { useRouter } from './router'

var mockPushRouter = jest.fn()
jest.mock(`next/navigation`, () => ({
  useRouter: () => ({ push: mockPushRouter }),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
  usePathname: jest.fn().mockReturnValue('/current-path'),
}))
describe(`src/hooks/router.ts`, () => {
  mockPushRouter.mockReturnValue(undefined)
  describe('.useRouter()', () => {
    describe('.pushQuery()', () => {
      it(`should trigger push with compiled query params when request is valid`, () => {
        const router = useRouter()
        router.pushQuery({
          someQuery: 'someValue',
        })
        expect(mockPushRouter).toBeCalledWith(
          '/current-path?someQuery=someValue'
        )
      })
    })
  })
})
