import { create } from './../../lib/zustand'

type State = {
  loading: boolean
  setLoading: (isLoading: boolean) => void
}

export const useLoadingStore = create<State>((set) => ({
  loading: false,
  setLoading: (isLoading) => set({ loading: isLoading }),
}))
