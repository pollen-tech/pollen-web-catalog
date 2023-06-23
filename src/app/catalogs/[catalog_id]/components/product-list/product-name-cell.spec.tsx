import { render, screen } from '@testing-library/react'
import { ProductNameCell } from '.'

describe('ProductNameCell', () => {
  it('should renders <ProductNameCell/> with proper content', () => {
    render(
      <ProductNameCell
        name="test"
        shelfLifeRemainingDay={20}
        thumbnail="https://some-domain.com/some-thumbnail"
      />
    )
    screen.getByTestId('product-thumbnail')
    const componentShelfRemainingDay = screen.getByTestId(
      'product-shelfLifeRemainingDay'
    )
    expect(componentShelfRemainingDay.innerHTML).toBe(`Expiring in 20 days`)
    const componentProductName = screen.getByTestId('product-name')
    expect(componentProductName.innerHTML).toBe(`test`)
  })
})
