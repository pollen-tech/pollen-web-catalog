import { render, screen, act } from '@testing-library/react'
import ImageViewer from './image-viewer'

describe('ImageViewer', () => {
  const trigger = <button data-testid="trigger-dialog-button">open</button>
  it('should renders <ImageViewer/> with proper content', () => {
    render(
      <ImageViewer
        trigger={trigger}
        images={[
          'https://test.com/path/to/image-1.jpg',
          'https://test.com/path/to/image-2.jpg',
        ]}
      />
    )
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    expect(triggerButton).toBeInTheDocument()
  })
  it('should show component dialog when trigger button clicked', () => {
    render(
      <ImageViewer
        trigger={trigger}
        images={[
          'https://test.com/path/to/image-1.jpg',
          'https://test.com/path/to/image-2.jpg',
        ]}
      />
    )
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const closeButton = screen.getByTestId('close-dialog-button')
    expect(closeButton).toBeInTheDocument()
  })
  it('should change to next image when next button clicked', () => {
    render(
      <ImageViewer
        trigger={trigger}
        images={[
          'https://test.com/path/to/image-1.jpg',
          'https://test.com/path/to/image-2.jpg',
        ]}
      />
    )
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const nextButton = screen.getByTestId('next-image-button')
    const closeButton = screen.getByTestId('close-dialog-button')
    expect(closeButton).toBeInTheDocument()
    act(() => {
      nextButton.click()
    })
    const imageViewerImage = screen.getByTestId('current-image')
    expect(imageViewerImage.getAttribute('src')).toBe(
      '/_next/image?url=https%3A%2F%2Ftest.com%2Fpath%2Fto%2Fimage-2.jpg&w=750&q=75'
    )
  })
  it('should change back to the first image when next button clicked and current image is the latest one', () => {
    render(
      <ImageViewer
        trigger={trigger}
        images={[
          'https://test.com/path/to/image-1.jpg',
          'https://test.com/path/to/image-2.jpg',
        ]}
      />
    )
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const nextButton = screen.getByTestId('next-image-button')
    const closeButton = screen.getByTestId('close-dialog-button')
    expect(closeButton).toBeInTheDocument()
    act(() => {
      nextButton.click()
    })
    act(() => {
      nextButton.click()
    })
    const imageViewerImage = screen.getByTestId('current-image')
    expect(imageViewerImage.getAttribute('src')).toBe(
      '/_next/image?url=https%3A%2F%2Ftest.com%2Fpath%2Fto%2Fimage-1.jpg&w=750&q=75'
    )
  })
  it('should change to the latest image when prev button clicked and current image is the first one', () => {
    render(
      <ImageViewer
        trigger={trigger}
        images={[
          'https://test.com/path/to/image-1.jpg',
          'https://test.com/path/to/image-2.jpg',
        ]}
      />
    )
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const prevButton = screen.getByTestId('prev-image-button')
    const closeButton = screen.getByTestId('close-dialog-button')
    expect(closeButton).toBeInTheDocument()
    act(() => {
      prevButton.click()
    })
    const imageViewerImage = screen.getByTestId('current-image')
    expect(imageViewerImage.getAttribute('src')).toBe(
      '/_next/image?url=https%3A%2F%2Ftest.com%2Fpath%2Fto%2Fimage-2.jpg&w=750&q=75'
    )
  })
  it('should change to the previous image when prev button clicked', () => {
    render(
      <ImageViewer
        trigger={trigger}
        images={[
          'https://test.com/path/to/image-2.jpg',
          'https://test.com/path/to/image-1.jpg',
        ]}
      />
    )
    const triggerButton = screen.getByTestId('trigger-dialog-button')
    act(() => {
      triggerButton.click()
    })
    const prevButton = screen.getByTestId('next-image-button')
    const closeButton = screen.getByTestId('close-dialog-button')
    expect(closeButton).toBeInTheDocument()
    act(() => {
      prevButton.click()
    })
    const imageViewerImage = screen.getByTestId('current-image')
    expect(imageViewerImage.getAttribute('src')).toBe(
      '/_next/image?url=https%3A%2F%2Ftest.com%2Fpath%2Fto%2Fimage-1.jpg&w=750&q=75'
    )
  })
})
