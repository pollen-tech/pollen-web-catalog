import { existsAndNotNaN } from './number'
describe(`number.ts`, () => {
  describe(`existsAndNotNaN()`, () => {
    it(`should return false when input is alphanumeric string`, () => {
      const res = existsAndNotNaN('abcdefg')
      expect(res).toBeFalsy()
    })
    it(`should return true when input is numeric string`, () => {
      const res = existsAndNotNaN('10')
      expect(res).toBeTruthy()
    })
  })
})
