import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './slices/CartSlice'
import ShopSlice from './slices/ShopSlice'
import  filterAmountSlice from './slices/FilterSlice'
import TagSlice from './slices/TagSlice'

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    shop: ShopSlice,
    filter: filterAmountSlice,
    tag: TagSlice
  },
})