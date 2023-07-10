import { render, screen } from '@testing-library/react'
import ContactSalesModal from '.'
import { act } from 'react-dom/test-utils'

describe('ContactSalesModal', () => {
  it('should renders <ContactSalesModal/> with proper content', () => {
    render(
      <ContactSalesModal
        catalogId="some-id"
      />
    )
    const triggerComponent = screen.getByTestId('trigger-dialog-button')
    expect(triggerComponent).toBeInTheDocument()
  })
  it('should popup modal when button show triggered', () => {
    render(
      <ContactSalesModal
        catalogId="some-id"
      />
    )
    const dialogButton = screen.getByTestId('trigger-dialog-button')
    act(()=> {
      dialogButton.click()
    })
    const caption = screen.getByTestId('caption')
    expect(caption).toBeInTheDocument()
    
  })
})
