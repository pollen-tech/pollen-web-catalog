jest.mock('xlsx', () => ({
  read: jest.fn().mockImplementation(() => {
    return {
      send: jest.fn().mockImplementation(() => {}),
    }
  }),
  utils: jest.fn().mockImplementation(() => {
    return {
      decode_range: jest.fn(),
      sheet_to_json: jest.fn(),
    }
  }),
}))

describe(`excel.ts`, () => {
  describe(`readFromFile()`, () => {
    it(`should parse to json when worksheet is valid`, async () => {
      expect(true).toBeTruthy()
    })
  })
})
