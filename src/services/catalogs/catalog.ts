import type { Catalog } from '@pollen-tech/appsync-schema'

import { query } from '~/lib/client'
import { FETCH_CATALOGS, GET_CATALOG_QUERY } from './query.gql'
import { type Paginated } from '../generic/pagination'
import { type RequestContext } from '~/@types/request-context'

type TQueryResponse = {
  catalog: Catalog
}

export async function fetchCatalogDetail(
  catalogId: string,
  context?: RequestContext
) {
  const response = await query<TQueryResponse>(
    {
      query: GET_CATALOG_QUERY,
      variables: {
        catalogId,
      },
    },
    context
  )

  return response.data.catalog
}

export interface TQueryCatalogsResponse {
  catalogs: Paginated<Catalog>
}
export async function fetchCatalogs(
  search = '',
  page = 1,
  size = 10,
  sort = 'updatedAt',
  sortDirection = 'asc',
  sellerId = '',
  context?: RequestContext
) {
  const response = await query<TQueryCatalogsResponse>(
    {
      query: FETCH_CATALOGS,
      variables: {
        page,
        size,
        search,
        sort,
        sortDirection,
        sellerId: sellerId.split(','),
      },
    },
    context
  )
  return response.data.catalogs
}
