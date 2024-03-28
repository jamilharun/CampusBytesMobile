import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filterAmount: 0,
}

export const filterAmountSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {    
    setAmount: (state, action) => {
      state.amount = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAmount } = filterAmountSlice.actions;

export const selectFilterAmount = state => state.filter.amount;

export default filterAmountSlice.reducer;


