import gql from 'graphql-tag'

export const GET_CATALOG_QUERY = gql`
  query getCatalogDetail($catalogId: ID!) {
    catalog(catalogId: $catalogId) {
      id
      name
      totalAskingPriceUsd
      warehouseLocation
      createdAt
      totalWeight
      seller {
        companyName
        logo
      }
      batches {
        id
        productName
        images
        brand
        shelfLifeRemainingDay
        barcode
        skuNumber
        availableUnit
        sellingUnit
        askingPriceUsd
        retailPriceUsd
      }
    }
  }
`

export const FETCH_CATALOGS = gql`
  query fetchCatalogs(
    $page: Int!
    $size: Int!
    $search: String!
    $sort: String!
    $sortDirection: String!
    $sellerId: [String]
  ) {
    catalogs(
      page: $page
      size: $size
      sort: $sort
      search: $search
      sortDirection: $sortDirection
      sellerId: $sellerId
    ) {
      page
      size
      totalItems
      totalPages
      data {
        createdAt
        description
        id
        name
        totalAskingPriceUsd
        totalWeight
        updatedAt
        warehouseLocation
        seller {
          companyName
          logo
        }
      }
    }
  }
`
