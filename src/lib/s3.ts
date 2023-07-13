import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { config } from '../config'

// create s3 client
const getS3Client = () => {
  const s3 = new S3Client({
    credentials: {
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
    },
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
    const command = new PutObjectCommand(params)
    const upload = await s3.send(command)
    return upload
  },
})
