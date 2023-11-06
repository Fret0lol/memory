import { create } from "zustand";

type State = {
  level: number
}

type Action = {
  setLevel: (level: State['level']) => void
}

export const useGame = create<State & Action>((set) => ({
  level: 6,
  setLevel: (level: number) => {
    set(() => ({ level: level}))
  }
}))