import { combineReducers, configureStore } from "@reduxjs/toolkit"
import placesReduser from './slices/placesSlice'

const rootReducer = combineReducers({
  main: placesReduser
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type  AppDispatch = typeof store.dispatch
