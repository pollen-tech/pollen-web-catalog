import { render, screen } from '@testing-library/react'
import { Button } from '.'

const mockOnClick = jest.fn()

describe('Button', () => {
  it('should renders <Button/> with', () => {
    render(<Button>Click Me!</Button>)
    const button = screen.getByText('Click Me!')

    expect(button).toBeInTheDocument()
  })
  it('should call onClick when clicked', () => {
    render(<Button onClick={mockOnClick}>Click Me!</Button>)
    const button = screen.getByText('Click Me!')

    button.click()

    expect(mockOnClick).toHaveBeenCalled()
  })
})
