import { parseUsingHeader } from './arrayObject'
describe(`arrayObject.ts`, () => {
  describe(`parseUsingHeader()`, () => {
    it(`should return parsed object when input is array of array`, () => {
      const req = [
        ['id', 'name'],
        ['1', 'name 1'],
        ['2', 'name 2'],
        ['3', 'name 3'],
      ]
      const res = parseUsingHeader(req)
      expect(res[0].id).toBe('1')
      expect(res[0].name).toBe('name 1')
    })
  })
})
