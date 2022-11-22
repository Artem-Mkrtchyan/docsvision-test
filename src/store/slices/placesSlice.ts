import { THierarchy, TInitialState } from '../../types/databaseType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: TInitialState = {
  loading: false,
  error: '',
  hierarchy: [],
  invectory: []
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
    setPlaces(state, action: PayloadAction<Array<THierarchy>>){
      state.hierarchy = action.payload
    }
  }
})

export default placesSlice.reducer
