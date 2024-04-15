import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart: (state, action) => {
        state.items = [...state.items, action.payload]
    },
    removefromCart: (state, action) => {
        let newCart = [...state.items];
        let itemIndex = state.items.findIndex(item => item._id == action.payload._id);
        if(itemIndex >= 0){
            newCart.splice(itemIndex,1)
        }else{
            console.log("can't remove the item that is not added to the cart!");
        }
        state.items = newCart;
    },
  emptyCart: (state, action) => {
        state.items = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addtoCart, removefromCart , emptyCart} = CartSlice.actions

export const selectCartItems = state=> state.cart.items;

export const selectCartItemsById = (state, _id)=> state.cart.items.filter(item=> item._id == _id )

export const selectCarttotal = state=> state.cart.items.reduce((total, item)=> total= total+item.price, 0);

export default CartSlice.reducer