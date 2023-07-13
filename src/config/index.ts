export const config = {
  appsync: {
    endpoint: process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT,
  },
  marketingUrl: process.env.LMS_MARKETING_URL,
  lms: {
    endpoint: process.env.LMS_ENDPOINT as string,
    apiKey: process.env.LMS_API_KEY as string,
  },
  smtp: {
    host: process.env.NEXT_SMTP_HOST as string,
    port: process.env.NEXT_SMTP_PORT as string,
    username: process.env.NEXT_SMTP_USERNAME as string,
    password: process.env.NEXT_SMTP_PASSWORD as string,
    email: process.env.NEXT_SMTP_EMAIL as string,
    secured: !!process.env.NEXT_SMTP_SECURED,
  },
  salesEmails: process.env.NEXT_SALES_EMAILS as string,
  aws: {
    region: process.env.NEXT_AWS_REGION as string,
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY as string,
    s3: {
      bucket: process.env.NEXT_AWS_S3_BUCKET ?? 'files.mypollenstore.com',
    },
  },
}
