import { create as zustandCreate } from 'zustand'
import { create } from './zustand'

// mock zustand
jest.mock('zustand', () => ({
  create: jest.fn(),
}))

describe(`zustand.ts`, () => {
  describe(`create()`, () => {
    it(`should call zustand create method when function is called`, async () => {
      create((set) => ({
        someState: false,
        setSomeState: (isSomeState: boolean) => set({ someState: isSomeState }),
      }))
      // assert that zustand create method is called
      expect(zustandCreate).toBeCalled()
    })
  })
})
