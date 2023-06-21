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
        image
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
