import type { Catalog } from '@pollen-tech/appsync-schema'

import { query } from '~/lib/client'
import { GET_CATALOG_QUERY } from './query.gql'

type TQueryResponse = {
  catalog: Catalog
}

export async function fetchCatalogDetail(catalogId: string) {
  const response = await query<TQueryResponse>({
    query: GET_CATALOG_QUERY,
    variables: {
      catalogId,
    },
  })

  return response.data.catalog
}
