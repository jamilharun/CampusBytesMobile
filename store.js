import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './slices/CartSlice'
import ShopSlice from './slices/ShopSlice'

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    shop: ShopSlice
  },
})