import { render, screen } from '@testing-library/react'
import { ProductList } from '.'

describe('ProductList', () => {
  it('should renders <ProductList/> with proper content', () => {
    render(
      <ProductList
        products={[
          {
            productName: 'test',
            currency: 'IDR',
            availableUnit: 20,
            totalUnits: 30,
            totalAskingPrice: 10000,
          },
        ]}
      />
    )
    const productListComponent = screen.getByTestId('product-list-table')
    expect(productListComponent).toBeInTheDocument()
    const bodyComponent = screen.getByTestId('product-list-table-body')
    expect(bodyComponent).toBeInTheDocument()
    expect(bodyComponent.children).toHaveLength(1)
    const productCellName = screen.getByTestId('product-cell-name')
    expect(productCellName).toBeInTheDocument()
  })
})
