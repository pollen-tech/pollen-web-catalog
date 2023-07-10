import type { User } from '~/@types/user'
import { useInternalRequest } from './request'

export const useUser = () => {
  const { req, error, loading } = useInternalRequest()
  const getMe = async () => {
    const { data } = await req.post<{ buyerProfile: string }>(`/api/auth/me`)
    const buyer: User = JSON.parse(data.buyerProfile) as User
    return buyer
  }
  return { getMe, error, loading }
}
