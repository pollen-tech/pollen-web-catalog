import { create } from './../../lib/zustand'

type State = {
  loading: boolean
  setLoading: (isLoading: boolean) => void
}

export const useMakeOfferStates = create<State>((set) => ({
  loading: false,
  setLoading: (isLoading) => set({ loading: isLoading }),
}))
