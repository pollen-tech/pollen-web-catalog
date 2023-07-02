import { fireEvent, render, screen } from '@testing-library/react'
import { CatalogList } from './catalog-list'
import { act } from 'react-dom/test-utils'

describe('CatalogList', () => {
  it('should renders <CatalogList/> with proper content', () => {
    render(
      <CatalogList
        catalogs={[
          {
            name: 'some-name',
            id: 'some-id',
          },
        ]}
      />
    )
    const productListComponent = screen.getByTestId('product-list-table')
    expect(productListComponent).toBeInTheDocument()
    const bodyComponent = screen.getByTestId('product-list-table-body')
    expect(bodyComponent).toBeInTheDocument()
    expect(bodyComponent.children).toHaveLength(1)
  })
})
