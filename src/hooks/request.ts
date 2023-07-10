import axios from 'axios'
import { useState } from 'react'
export const useInternalRequest = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const req = axios.create()
  req.interceptors.request.use((req) => {
    setLoading(true)
    return req
  })
  req.interceptors.response.use((res) => {
    setLoading(false)
    setError('')
    if (res.status >= 400) {
      if (typeof res.data === 'string') {
        setError(res.data)
      }
      if (typeof res.data === 'object') {
        const data = res.data as Record<string, string>
        setError(data.message)
      }
    }
    return res
  })
  return { req, loading, error }
}
