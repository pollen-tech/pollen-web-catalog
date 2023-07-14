import {
  render,
  screen,
  act,
  fireEvent,
  renderHook,
} from '@testing-library/react'
import { MakeOfferModal } from './make-offer-modal'
import { useInternalRequest } from '../../../../../hooks/request'
import React from 'react'
import { useLoadingStore } from '~/hooks/states/loading'

jest.mock('../../../../../hooks/request', () => ({
  useInternalRequest: jest.fn().mockReturnValue({
    req: jest.fn().mockReturnValue({
      post: jest.fn().mockImplementation(() => ({})),
    }),
  }),
}))

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

  it('should detect enter drag container', () => {
    render(<MakeOfferModal catalogId="some-catalog-id" />)
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const imageContainer = screen.getByTestId('file-input-container')
    act(() => {
      fireEvent.dragEnter(imageContainer, {
        dataTransfer: {
          files: [
            new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
          ],
        },
      })
    })
    expect(imageContainer).toHaveClass('bg-slate-100')
  })

  it('should detect leave drag container', () => {
    render(<MakeOfferModal catalogId="some-catalog-id" />)
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const imageContainer = screen.getByTestId('file-input-container')
    act(() => {
      fireEvent.dragLeave(imageContainer, {
        dataTransfer: {
          files: [
            new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
          ],
        },
      })
    })
    expect(imageContainer).not.toHaveClass('bg-slate-100')
  })

  it('should detect over the drag container', () => {
    render(<MakeOfferModal catalogId="some-catalog-id" />)
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const imageContainer = screen.getByTestId('file-input-container')
    act(() => {
      fireEvent.dragOver(imageContainer, {
        dataTransfer: {
          files: [
            new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
          ],
        },
      })
    })
    expect(imageContainer).not.toHaveClass('bg-slate-100')
  })

  it('should detect the drag drop file', () => {
    render(<MakeOfferModal catalogId="some-catalog-id" />)
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const imageContainer = screen.getByTestId('file-input-container')
    act(() => {
      fireEvent.drop(imageContainer, {
        dataTransfer: {
          files: [
            new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
          ],
        },
      })
    })
    const addedFile = screen.getByTestId('added-file-container')
    expect(addedFile).toBeInTheDocument()
  })

  it('should cancel the added file', () => {
    render(<MakeOfferModal catalogId="some-catalog-id" />)
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const imageContainer = screen.getByTestId('file-input-container')
    act(() => {
      fireEvent.drop(imageContainer, {
        dataTransfer: {
          files: [
            new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
          ],
        },
      })
    })

    const addedFile = screen.getByTestId('added-file-container')
    expect(addedFile).toBeInTheDocument()

    const replaceButton = screen.getByTestId('replace-file-button')
    expect(replaceButton).toBeInTheDocument()

    act(() => {
      replaceButton.click()
    })

    expect(imageContainer).toBeInTheDocument()
  })

  it('should parse file to the backend', () => {
    render(<MakeOfferModal catalogId="some-catalog-id" />)
    ;(useInternalRequest as jest.Mock).mockReturnValue({
      req: {
        post: jest.fn().mockImplementation(() => ({})),
      },
    })
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const imageContainer = screen.getByTestId('file-input-container')
    act(() => {
      fireEvent.drop(imageContainer, {
        dataTransfer: {
          files: [
            // excel file
            new File(['(⌐□_□)'], 'chucknorris.xlsx', {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            }),
          ],
        },
      })
    })
    const addedFile = screen.getByTestId('added-file-container')
    expect(addedFile).toBeInTheDocument()

    const submitButton = screen.getByTestId('continue-button')
    act(() => {
      submitButton.click()
    })

    const { result } = renderHook(() => useLoadingStore())
    result.current.setLoading(true)

    const loadingButton = screen.getByTestId('loading-button')
    expect(loadingButton).toBeInTheDocument()
    expect(useInternalRequest).toBeCalled()
  })
})
