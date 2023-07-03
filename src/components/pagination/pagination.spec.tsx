import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
export var pushQueryMock = jest.fn()
jest.mock('../../hooks/router', () => ({
  useRouter: () => ({
    pushQuery: pushQueryMock,
  }),
}))

import Pagination from './pagination'

describe('Pagination', () => {
  it('should renders <Pagination/> when parameter is valid', async () => {
    render(<Pagination page={1} totalPages={5} />)
    await waitFor(() => {
      expect(screen.getByTestId('pagination-container')).toBeInTheDocument()
    })
    const container = screen.getByTestId('container')
    expect(container).toBeDefined()
    const pageLinks = screen.getAllByTestId('page-links')
    expect(pageLinks).toHaveLength(5)
  })
  it('should renders <Pagination/> with limited link when totalPages is larger than screen', () => {
    render(<Pagination page={1} totalPages={999} />)
    const container = screen.getByTestId('container')
    expect(container).toBeDefined()
    const pageLinks = screen.getAllByTestId('page-links')
    expect(pageLinks).toHaveLength(6)
    const lastPage = screen.getByText('999')
    expect(lastPage).toBeDefined()
  })

  it('should change to the next page when next button clicked', () => {
    render(<Pagination page={1} totalPages={999} />)
    const container = screen.getByTestId('container')
    expect(container).toBeDefined()
    const nextButton = screen.getByTestId('next-button')
    act(() => {
      fireEvent.click(nextButton)
    })
    expect(pushQueryMock).toBeCalledWith({ page: '2' })
  })

  it('should not be able change page when next button clicked but active page is the last one', () => {
    pushQueryMock.mockClear()
    render(<Pagination page={999} totalPages={999} />)
    const container = screen.getByTestId('container')
    expect(container).toBeDefined()
    const nextButton = screen.getByTestId('next-button')
    act(() => {
      fireEvent.click(nextButton)
    })
    expect(pushQueryMock).not.toBeCalled()
  })

  it('should change to the previous page when previous button clicked', () => {
    render(<Pagination page={999} totalPages={999} />)
    const container = screen.getByTestId('container')
    expect(container).toBeDefined()
    const prevButton = screen.getByTestId('prev-button')
    act(() => {
      fireEvent.click(prevButton)
    })
    expect(pushQueryMock).toBeCalledWith({ page: '998' })
  })

  it('should not be able change page when prev button clicked but active page is the first one', () => {
    pushQueryMock.mockClear()
    render(<Pagination page={1} totalPages={999} />)
    const container = screen.getByTestId('container')
    expect(container).toBeDefined()
    const prevButton = screen.getByTestId('prev-button')
    act(() => {
      fireEvent.click(prevButton)
    })
    expect(pushQueryMock).not.toBeCalled()
  })

  it('should change to spesific page when spesific page button clicked', () => {
    pushQueryMock.mockClear()
    render(<Pagination page={1} totalPages={999} />)
    const container = screen.getByTestId('container')
    expect(container).toBeDefined()
    const pageLinks = screen.getAllByTestId('page-links')
    act(() => {
      fireEvent.click(pageLinks[4])
    })
    expect(pushQueryMock).toBeCalledWith({ page: '5' })
  })
})
