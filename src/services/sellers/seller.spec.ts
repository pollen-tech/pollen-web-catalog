import { fetchSellers } from './sellers'
import { query } from '../../lib/client'
import { FETCH_SELLERS } from './query.gql'

jest.mock('../../lib/client')

describe('fetchSellers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch sellers successfully', async () => {
    // Mock the response data
    const mockResponse = {
      data: {
        sellers: {
          // mocked sellers data
        },
      },
    }

    // Mock the query function implementation
    ;(query as any).mockResolvedValue(mockResponse)

    // Call the function
    const search = 'your-search'
    const page = 1
    const size = 20
    const result = await fetchSellers(search, page, size)

    // Assert the query function is called with the correct arguments
    expect(query).toHaveBeenCalledWith({
      query: FETCH_SELLERS,
      variables: {
        page,
        size,
        search,
      },
    })

    // Assert the result
    expect(result).toEqual(mockResponse.data.sellers)
  })
})
