import { act, fireEvent, render, screen } from '@testing-library/react'
import { SearchInfo } from "./search-info"
export var pushQueryMock = jest.fn()

jest.mock('../../../../hooks/router', () => ({
  useRouter: () => ({
    pushQuery: pushQueryMock,
  }),
}))


describe('SearchInfo', () => {
    it('should renders <SearchInfo/> with proper content', () => {
        render(<SearchInfo/>)
        const form = screen.getByTestId('form')
        expect(form).toBeDefined()
    })
    it('should query push search when search form submitted', () => {
        render(<SearchInfo/>)
        const form = screen.getByTestId('form')
        const searchField = screen.getByTestId('search-field')
        act(() => {
            fireEvent.change(searchField, { target: { value: '123' }})
        })
        expect(screen.getByDisplayValue('123')).toBe(searchField)
        act(() => {
            fireEvent.submit(form)
        })
        expect(pushQueryMock).toBeCalledWith({"search": "123"})
    })
})