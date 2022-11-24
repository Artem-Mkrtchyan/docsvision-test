import { RootState } from "./store"

export const selectors = {
  getHierarchy: (state: RootState) => state.main.hierarchy,
  getInventory: (state: RootState) => state.main.invectory
}
