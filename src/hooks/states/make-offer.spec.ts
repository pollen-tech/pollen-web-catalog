import { renderHook, act } from '@testing-library/react'
import { useMakeOfferStates } from './make-offer'

describe('useMakeOfferStates', () => {
  it('should initialize with loading set to false', () => {
    const { result } = renderHook(() => useMakeOfferStates())
    expect(result.current.loading).toBe(false)
  })

  it('should update loading state when setLoading is called', () => {
    const { result } = renderHook(() => useMakeOfferStates())

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
