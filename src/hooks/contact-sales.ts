import { useInternalRequest } from './request'

export const useContactSales = () => {
  const { req, error, loading } = useInternalRequest()
  const sendContactSales = async (catalogId: string) => {
    await req.post(`/api/catalogs/${catalogId}/contact-sales`)
  }
  return { sendContactSales, error, loading }
}
