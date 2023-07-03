export const config = {
  appsync: {
    endpoint: process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT,
  },
  marketingUrl: process.env.LMS_MARKETING_URL,
  lms: {
    endpoint: process.env.LMS_ENDPOINT as string,
    apiKey: process.env.LMS_API_KEY as string,
  },
}
