import { render, screen } from '@testing-library/react'
import ContactSalesSuccessDialog from './contact-sales-success-dialog'

describe('ContactSalesSuccessDialog', () => {
  it('should renders <ContactSalesSuccessDialog/> with proper content', () => {
    render(
      <ContactSalesSuccessDialog
        open={true}
      />
    )
    const dialogContainer = screen.getByTestId('dialog-container')
    expect(dialogContainer).toBeInTheDocument()
  })
})
