/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// import s3 client
import { S3 } from 'aws-sdk'
import { config } from '../config'

// create s3 client
const getS3Client = () => {
  const s3 = new S3({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region,
  })
  return s3
}

export const s3Service = (bucketName: string) => ({
  uploadFile: async (file: Buffer, fileName: string) => {
    const s3 = getS3Client()
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file,
    }
    const upload = await s3.upload(params).promise()
    return upload
  },
})
