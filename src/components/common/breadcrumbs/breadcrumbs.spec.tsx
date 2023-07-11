import { render } from '@testing-library/react'
import { Breadcrumbs } from '.'
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
  it('should renders <Breadcrumbs/> with', () => {
    const breadcrumbsBtn = render(<Breadcrumbs {...props} />)
    expect(breadcrumbsBtn).toBeTruthy()
  })
})
