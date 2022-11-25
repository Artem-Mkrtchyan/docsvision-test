import { RootState } from "./store"

export const selectors = {
  getMainPage: (state: RootState) => state.main,
}
