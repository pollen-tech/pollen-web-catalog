import { render, screen, act } from '@testing-library/react'
import { MakeOfferModal } from './make-offer-modal'
import { useInternalRequest } from '../../../../../hooks/request'
import React from 'react'
import { useMakeOfferStates } from '../../../../../hooks/states/make-offer'

const mockUseState = jest.spyOn(React, 'useState')
const mockDragging = jest.fn()
const mockModalOpen = jest.fn()
const mockFile = jest.fn()
const mockErrors = jest.fn()
mockUseState.mockImplementationOnce(() => [false, mockDragging])
mockUseState.mockImplementationOnce(() => [false, mockModalOpen])
mockUseState.mockImplementationOnce(() => [null, mockFile])
mockUseState.mockImplementationOnce(() => [[], mockErrors])

jest.mock('../../../../../hooks/request', () => ({
  useInternalRequest: jest.fn().mockReturnValue({
    req: jest.fn(),
  }),
}))

jest.mock('../../../../../hooks/states/make-offer', () => ({
  useMakeOfferStates: jest.fn().mockReturnValue({
    setLoading: jest.fn(),
    loading: false,
  }),
}))

const { loading } = useMakeOfferStates((state) => state)

describe('MakeOfferModal', () => {
  it('should renders <MakeOfferModal/> with proper content', () => {
    render(<MakeOfferModal catalogId="some-catalog-id" />)
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    expect(triggerButton).toBeInTheDocument()
  })
  it('should renders <MakeOfferModal/> with proper content', () => {
    render(<MakeOfferModal catalogId="some-catalog-id" />)
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const closeButton = screen.getByTestId('close-dialog-button')
    expect(closeButton).toBeInTheDocument()
  })

  it('should hit API endpoints', () => {
    ;(useInternalRequest as jest.Mock).mockImplementation(() => ({
      req: jest.fn().mockImplementation(() => {
        return {
          post: jest.fn().mockResolvedValue({
            response: {
              data: {
                message: 'some-message',
              },
            },
          }),
        }
      }),
    }))

    render(<MakeOfferModal catalogId="some-catalog-id" />)
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const fileInputContainer = screen.getByTestId('continue-button')
    act(() => {
      fileInputContainer.click()
    })
    const fileInput = screen.getByTestId('file-input')
    act(() => {
      fileInput.click()
    })
    const continueButton = screen.getByTestId('continue-button')
    act(() => {
      continueButton.click()
    })
    expect(loading).toBeFalsy()
  })
})
