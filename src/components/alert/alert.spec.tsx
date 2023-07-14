import { render, screen } from '@testing-library/react'
import { Alert } from './alert'

describe('Alert', () => {
  it('should renders fixed <Alert /> with message', () => {
    render(<Alert message="error!" />)
    const alert = screen.getByTestId('fixed-alert-wrapper')
    expect(alert).toBeInTheDocument()
  })
  it('should renders floating <Alert /> with message', () => {
    render(<Alert message="error!" floating={true} />)
    const alert = screen.getByTestId('floating-alert-wrapper')
    expect(alert).toBeInTheDocument()
  })
})
