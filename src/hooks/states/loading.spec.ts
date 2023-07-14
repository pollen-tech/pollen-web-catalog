import { renderHook, act } from '@testing-library/react'
import { useLoadingStore } from './loading' // Replace with the correct import path

describe('useLoadingStore', () => {
  it('should initialize with loading set to false', () => {
    const { result } = renderHook(() => useLoadingStore())
    expect(result.current.loading).toBe(false)
  })

  it('should update loading state when setLoading is called', () => {
    const { result } = renderHook(() => useLoadingStore())

    act(() => {
      result.current.setLoading(true)
    })

    expect(result.current.loading).toBe(true)

    act(() => {
      result.current.setLoading(false)
    })

    expect(result.current.loading).toBe(false)
  })
})
