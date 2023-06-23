import { render, screen, act } from '@testing-library/react'
import { MakeOfferModal } from './make-offer-modal'

describe('MakeOfferModal', () => {
  it('should renders <MakeOfferModal/> with proper content', () => {
    render(<MakeOfferModal catalogId='some-catalog-id'/>)
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    expect(triggerButton).toBeInTheDocument()
  })
  it('should renders <MakeOfferModal/> with proper content', () => {
    render(<MakeOfferModal catalogId='some-catalog-id'/>)
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const closeButton = screen.getByTestId('close-dialog-button')
    expect(closeButton).toBeInTheDocument()
  })
})
