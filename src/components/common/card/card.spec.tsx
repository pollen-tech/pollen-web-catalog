import { render, screen } from '@testing-library/react'
import { Card } from './'

describe('Card', () => {
  it('should renders a content passed as children', () => {
    render(
      <Card>
        <h1>Hello</h1>
      </Card>
    )

    const heading = screen.getByRole('heading', {
      name: 'Hello',
    })

    expect(heading).toBeInTheDocument()
  })
})
