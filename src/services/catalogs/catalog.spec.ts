import { fetchCatalogDetail, fetchCatalogs } from './catalog'
import { query } from '../../lib/client'
import { GET_CATALOG_QUERY, FETCH_CATALOGS } from './query.gql'

jest.mock('../../lib/client', () => ({
  query: jest.fn(),
}))

describe('catalog.ts', () => {
  describe('fetchCatalogDetail', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should fetch catalog detail successfully', async () => {
      // Mock the response data
      const mockResponse = {
        data: {
          catalog: {
            // mocked catalog data
          },
        },
      }
      ;(query as any).mockResolvedValue(mockResponse)

      // Call the function
      const catalogId = 'your-catalog-id'
      const context = {
        cookies: {} as any,
      } // mock context if needed
      await fetchCatalogDetail(catalogId, context)

      // Assert the query function is called with the correct arguments
      expect(query).toHaveBeenCalledWith(
        {
          query: GET_CATALOG_QUERY,
          variables: {
            catalogId,
          },
        },
        context
      )
    })
  })

  describe('fetchCatalogs', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should fetch catalogs successfully', async () => {
      // Mock the response data
      const mockResponse = {
        data: {
          catalogs: {
            // mocked catalogs data
          },
        },
      }
      ;(query as any).mockResolvedValue(mockResponse)

      // Call the function
      const search = 'your-search'
      const page = 1
      const size = 10
      const sort = 'updatedAt'
      const sortDirection = 'asc'
      const sellerId = 'your-seller-id'
      const context = {
        cookies: {} as any,
      } // mock context if needed
      await fetchCatalogs(
        search,
        page,
        size,
        sort,
        sortDirection,
        sellerId,
        context
      )

      // Assert the query function is called with the correct arguments
      expect(query).toHaveBeenCalledWith(
        {
          query: FETCH_CATALOGS,
          variables: {
            page,
            size,
            search,
            sort,
            sortDirection,
            sellerId: sellerId ? sellerId.split(',') : null,
          },
        },
        context
      )
    })
  })
})
