import type { StateCreator } from 'zustand'
import { create as zustandCreate } from 'zustand'
import { devtools } from 'zustand/middleware'

export const create = <T>(mutator: StateCreator<T, [], []>) =>
  zustandCreate<T>(devtools(mutator) as StateCreator<T, [], []>)
