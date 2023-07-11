import { render, screen } from '@testing-library/react'
import Breadcrumbs from './breadcrumbs'

const props = {
  items: [
    {
      label: 'Home',
      path: '/',
    },

    {
      label: 'Catalog Information',
      path: '',
    },
  ],
  deleteComment: jest.fn(),
}

describe('Breadcrumbs', () => {
  it('should renders <Button/> with', () => {
    render(<Breadcrumbs {...props}>Click Me!</Breadcrumbs>)
    const breadcrumbsBtn = screen.getByText('Click Me!')
    expect(breadcrumbsBtn).toBeInTheDocument()
  })
})
