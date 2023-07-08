import { act, fireEvent, render, screen } from '@testing-library/react'
import { SellerFilter } from './seller-filter'
let pushQueryMock = jest.fn()

jest.mock('../../../../hooks/router', () => ({
  useRouter: () => ({
    pushQuery: pushQueryMock,
  }),
}))

describe('SearchInfo', () => {
  it('should renders <SellerFilter/> with proper content', () => {
    render(<SellerFilter />)
    const form = screen.getByTestId('seller-list')
    expect(form).toBeDefined()
  })
})
