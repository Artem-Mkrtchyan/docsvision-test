import { THierarchy, TInitialState, TInventory } from '../../types/databaseType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState: TInitialState = {
  loading: false,
  error: '',
  hierarchy: [],
  inventory: [],
  currentInventory: [],
  isRoom: '',
  currentName: ''
}

export const placesSlice = createSlice({
  name: 'places',
  initialState: initialState,
  reducers: {
    fetching(state) {
      state.loading = true
    },
    fetchingFalse(state) {
      state.loading = false
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    setPlaces(state, action: PayloadAction<Array<THierarchy>>) {
      state.loading = false
      state.error = ''
      state.hierarchy = action.payload
    },
    setInvectory(state, action: PayloadAction<Array<TInventory>>) {
      state.loading = false
      state.error = ''
      state.inventory = action.payload
    },
    setCurrentInventory(state, action: PayloadAction<Array<TInventory>>) {
      state.currentInventory = action.payload
    },
    setRoom(state, action: PayloadAction<string>) {
      state.isRoom = action.payload
    },
    setCurrentName(state, action: PayloadAction<string>) {
      state.currentName = action.payload
    }
  }
})

export default placesSlice.reducer
