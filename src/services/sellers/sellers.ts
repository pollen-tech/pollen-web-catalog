import type { Seller } from '@pollen-tech/appsync-schema'

import { query } from '~/lib/client'
import { FETCH_SELLERS } from './query.gql'
import { type Paginated } from '../generic/pagination'

export interface TQuerySellersResponse {
  sellers: Paginated<Seller>
}
export async function fetchSellers(search = '', page = 1, size = 20) {
  const response = await query<TQuerySellersResponse>({
    query: FETCH_SELLERS,
    variables: {
      page,
      size,
      search,
    },
  })
  return response.data.sellers
}
