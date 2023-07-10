import { render, screen } from '@testing-library/react'
import Error403 from './page'

describe('Error403', () => {
  it('should renders <Error403/> with proper content', () => {
    render(<Error403 />)
    const component = screen.getByTestId('forbidden-component')
    expect(component).toBeDefined()
  })
})
