import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { s3Service } from './s3'

jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn().mockImplementation(() => {
    return {
      send: jest.fn().mockImplementation(() => {}),
    }
  }),
  PutObjectCommand: jest.fn().mockImplementation(() => {}),
}))

describe(`s3.ts`, () => {
  describe(`create()`, () => {
    it(`should call S3Client when function is initiated`, async () => {
      await s3Service('bucket').uploadFile(Buffer.from('file'), 'fileName')
      expect(S3Client).toBeCalled()
      expect(PutObjectCommand).toBeCalled()
    })
  })
})
