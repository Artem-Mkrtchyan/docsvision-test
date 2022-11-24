import { THierarchy, TInitialState, TInventory } from '../../types/databaseType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: TInitialState = {
  loading: false,
  error: '',
  hierarchy: [],
  invectory: [],
  currentInventory: []
};

export const placesSlice = createSlice({
  name: 'places',
  initialState: initialState,
  reducers: {
    fetching(state) {
      state.loading = true
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setPlaces(state, action: PayloadAction<Array<THierarchy>>) {
      state.error = ''
      state.hierarchy = action.payload
    },
    setInvectory(state, action: PayloadAction<Array<TInventory>>) {
      state.error = ''
      state.invectory = action.payload
    },
    setCurrentInventory(state, action: PayloadAction<Array<TInventory>>) {
      state.currentInventory = action.payload
    }
  }
})

export default placesSlice.reducer
