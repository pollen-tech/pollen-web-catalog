import gql from 'graphql-tag'

export const FETCH_SELLERS = gql`
  query fetchSellers($page: Int!, $size: Int!, $search: String!) {
    sellers(page: $page, size: $size, search: $search) {
      data {
        companyCountries
        currency
        id
        logo
        companyName
        companyType
        companyAlias
      }
      page
      size
      totalItems
      totalPages
    }
  }
`
