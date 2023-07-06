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
        askingPrice
        retailPrice
      }
    }
  }
`

export const FETCH_CATALOGS = gql`
  query fetchCatalogs(
    $page: Int!
    $size: Int!
    $sort: String!
    $sortDirection: String!
  ) {
    catalogs(
      page: $page
      size: $size
      sort: $sort
      sortDirection: $sortDirection
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
        totalAskingPrice
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
