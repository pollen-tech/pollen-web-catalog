import { Catalog } from '@pollen-tech/appsync-schema'
import { parseOffer } from './offers'
import awaitToError from '~/utils/awaitToError'

const mockCatalog = {
  id: 'PC20230711-BY5Z0I',
  name: 'Use the Name',
  totalAskingPriceUsd: 5420.5968,
  warehouseLocation: 'Malaysia',
  createdAt: '2023-07-11T09:34:10.656Z',
  totalWeight: 1237.78,
  seller: {
    companyName: 'Testing Company',
    logo: '',
  },
  batches: [
    {
      id: '917a3970-1d89-4ac3-a6a1-544e80e7f94b',
      productName: 'Granier fructis hairfood Aleo vera',
      images: [],
      brand: 'GARNIER FRUCTIS',
      shelfLifeRemainingDay: 235,
      barcode: '',
      skuNumber: 'C6498702',
      availableUnit: 199,
      sellingUnit: 'Carton/Cartons',
      askingPrice: 150000,
      retailPrice: 1500000,
    },
    {
      id: 'b8aec742-b881-418a-8aa3-eb44b4bb45b5',
      productName: 'Granier fructis hairfood Aleo vera',
      images: [],
      brand: 'GARNIER FRUCTIS',
      shelfLifeRemainingDay: 234,
      barcode: '',
      skuNumber: 'C6212200',
      availableUnit: 199,
      sellingUnit: 'Carton/Cartons',
      askingPrice: 150000,
      retailPrice: 1500000,
    },
    {
      id: 'fa2c6794-9511-43ff-9761-0370973d604b',
      productName:
        'Garnier pure Active intensive 3 in 1 charcoal anti blackhead mask scrub and wash',
      images: [],
      brand: 'GARNIER',
      shelfLifeRemainingDay: 232,
      barcode: '',
      skuNumber: 'C5377603',
      availableUnit: 199,
      sellingUnit: 'Carton/Cartons',
      askingPrice: 150000,
      retailPrice: 1500000,
    },
  ],
}

const mockOffer = [
  {
    'Barcode Number': '3600542318297',
    'SKU Number': 'C6498702',
    'Shelf Life Remaining': '235',
    '# Of Units': '10',
    'Offer Price / Unit': '3',
    'Total Value': '30',
  },
  {
    'Barcode Number': '3600542221061',
    'SKU Number': 'C6212200',
    'Shelf Life Remaining': '234',
    '# Of Units': '10',
    'Offer Price / Unit': '3',
    'Total Value': '30',
  },
  {
    'Barcode Number': '3600541895508',
    'SKU Number': 'C5377603',
    'Shelf Life Remaining': '232',
    '# Of Units': '10',
    'Offer Price / Unit': '3',
    'Total Value': '30',
  },
]

describe('offers.ts', () => {
  describe('parseOffer', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should parse catalog detail successfully when all data is valid', async () => {
      const result = await parseOffer(
        mockCatalog as unknown as Catalog,
        mockOffer
      )
      /**
       * sku
       * selfLifeRemainingDay
       * totalUnit
       * offerPrice
       * isListed
       * batchId
       * offerUnit
       */
      expect(result[0].sku).toBe(mockOffer[0]['SKU Number'])
      expect(result[0].isListed).toBeTruthy()
      expect(result[0].selfLifeRemainingDay + '').toBe(
        mockOffer[0]['Shelf Life Remaining']
      )
      expect(result[1].sku).toBe(mockOffer[1]['SKU Number'])
      expect(result[1].isListed).toBeTruthy()
      expect(result[1].selfLifeRemainingDay + '').toBe(
        mockOffer[1]['Shelf Life Remaining']
      )
      expect(result[2].sku).toBe(mockOffer[2]['SKU Number'])
      expect(result[2].isListed).toBeTruthy()
      expect(result[2].selfLifeRemainingDay + '').toBe(
        mockOffer[2]['Shelf Life Remaining']
      )
    })
    it('should return error not found when batch is not found', async () => {
      const customMock = [
        mockOffer[0],
        mockOffer[1],
        { ...mockOffer[2], 'SKU Number': 'C5377603-xxx' },
      ]
      const [err] = await awaitToError<{ sku: string; message: string }[]>(
        parseOffer(mockCatalog as unknown as Catalog, customMock)
      )
      /**
       * sku
       * selfLifeRemainingDay
       * totalUnit
       * offerPrice
       * isListed
       * batchId
       * offerUnit
       */
      expect(err[0].sku).toBe(customMock[2]['SKU Number'])
      expect(err[0].message).toBe(
        'SKU Number (C5377603-xxx) not found on catalog'
      )
    })
    it('should return zero point error when number of unit is empty', async () => {
      const customMock = [
        mockOffer[0],
        mockOffer[1],
        { ...mockOffer[2], '# Of Units': '' },
      ]
      const [err] = await awaitToError<{ sku: string; message: string }[]>(
        parseOffer(mockCatalog as unknown as Catalog, customMock)
      )
      /**
       * sku
       * selfLifeRemainingDay
       * totalUnit
       * offerPrice
       * isListed
       * batchId
       * offerUnit
       */
      expect(err[0].sku).toBe(customMock[2]['SKU Number'])
      expect(err[0].message).toBe(
        '# Of Units (C5377603) is empty'
      )
    })
    it('should return zero point error when offer price is empty', async () => {
      const customMock = [
        mockOffer[0],
        mockOffer[1],
        { ...mockOffer[2], 'Offer Price / Unit': '' },
      ]
      const [err] = await awaitToError<{ sku: string; message: string }[]>(
        parseOffer(mockCatalog as unknown as Catalog, customMock)
      )
      /**
       * sku
       * selfLifeRemainingDay
       * totalUnit
       * offerPrice
       * isListed
       * batchId
       * offerUnit
       */
      expect(err[0].sku).toBe(customMock[2]['SKU Number'])
      expect(err[0].message).toBe(
        'Offer Price / Unit (C5377603) is empty'
      )
    })
  })
})
