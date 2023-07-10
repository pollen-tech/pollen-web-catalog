import { act, fireEvent, render, screen } from '@testing-library/react'
import { SellerFilter, SellerList, SellerSearch } from './seller-filter'
import React, { useState } from 'react'
import { fetchSellers } from '~/services/sellers'
let pushQueryMock = jest.fn()

const sellers = [
  { id: '1', companyName: 'Test 1' },
  { id: '2', companyName: 'Test 2' },
  { id: '3', companyName: 'Test 3' },
  { id: '4', companyName: 'Test 4' },
  { id: '5', companyName: 'Test 5' },
  { id: '6', companyName: 'Test 6' },
  { id: '7', companyName: 'Test 7' },
]

jest.mock('../../../../hooks/router', () => ({
  useRouter: () => ({
    pushQuery: pushQueryMock,
  }),
}))

describe('SearchInfo', () => {
  it('should renders <SellerFilter/> with proper content', () => {
    render(<SellerFilter />)
    const list = screen.getByTestId('seller-list')
    expect(list).toBeDefined()
  })
  it('should renders <SellerList/> with seller list', () => {
    let selected: string[] = []
    const sellerList = render(
      <SellerList
        sellers={sellers}
        onSelect={(val) => {
          selected = val
        }}
      />
    )
    const list = sellerList.getAllByTestId('seller-checkboxes')
    act(() => {
      fireEvent.click(list[0])
      fireEvent.click(list[2])
    })
    expect(selected[0]).toBe('1')
    expect(selected[1]).toBe('3')
  })
  it('should renders <SellerSearch/> with seller list', () => {
    let text: string = ''
    const sellerSearch = render(
      <SellerSearch
        onChange={(val) => {
          text = val
        }}
      />
    )
    const searchField = sellerSearch.getByTestId('seller-search-field')
    act(() => {
      fireEvent.change(searchField, { target: { value: 'test' } })
    })
    expect(text).toBe('test')
  })
})
