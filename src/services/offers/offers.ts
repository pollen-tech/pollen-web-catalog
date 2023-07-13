import type { Catalog } from '@pollen-tech/appsync-schema'
import type { OfferError } from '~/@types/catalog'
import { existsAndNotNaN } from '~/utils/number'

export const parseOffer = async (
  catalog: Catalog,
  data: Record<string, string>[]
) => {
  const errors: OfferError[] = []
  const excelProp = data.map((d) => ({
    sku: d['SKU Number'],
    selfLifeRemainingDay: +d['Shelf Life Remaining'],
    totalUnit: parseFloat(d['# Of Units']),
    offerPrice: parseFloat(d['Offer Price / Unit']),
  }))

  const catalogProp = {
    sku: catalog.batches?.map((d) => d?.skuNumber),
    selfLifeRemainingDay: catalog.batches?.map((d) => d?.shelfLifeRemainingDay),
  }

  const availableBatch = excelProp
    .map((d) => {
      let isListed = false
      if (
        catalogProp.sku?.includes(d?.sku) &&
        catalogProp.selfLifeRemainingDay?.includes(d?.selfLifeRemainingDay)
      ) {
        isListed = true
      }
      return { ...d, isListed }
    })
    .forEach((d) => {
      if (!d.isListed) {
        errors.push({
          sku: d.sku,
          message: `SKU Number (${d.sku}) not found on catalog`,
        })
      }
    })
  if (errors.length > 0) {
    return Promise.reject(errors)
  }
  excelProp.forEach((d) => {
    if (existsAndNotNaN(d.offerPrice)) {
      errors.push({
        sku: d.sku,
        message: `Offer Price / Unit (${d.sku}) is empty`,
      })
    }
    if (existsAndNotNaN(d.totalUnit)) {
      errors.push({
        sku: d.sku,
        message: `# Of Units (${d.sku}) is empty`,
      })
    }
  })
  if (errors.length > 0) {
    return Promise.reject(errors)
  }
  return Promise.resolve(availableBatch)
}
