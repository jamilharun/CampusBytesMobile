import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './slices/CartSlice'
import ShopSlice from './slices/ShopSlice'
import  filterAmountSlice from './slices/FilterSlice'

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    shop: ShopSlice,
    filter: filterAmountSlice,
  },
})