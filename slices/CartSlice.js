// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   items: [],
// }

// export const CardSlice = createSlice({
//   name: 'card',
//   initialState,
//   reducers: {
//     addtoCart: (state, action) => {
//         state.items = [...state.items, action.payload]
//     },
//     removefromCart: (state, action) => {
//         let newCart = [...item.items];
//         let itemIndex = state.items.findIndex(item => item.id == action.payload.id);
//         if(itemIndex >= 0){
//             newCart.splice(itemIndex,1)
//         }else{
//             console.log("can't remove the item that is not added to the cart!");
//         }
//         state.items = newCart;
//     },
//   emptyCart: (state, action) => {
//         state.items = [];
//     },
//   },
// })

// Action creators are generated for each case reducer function
// export const { addtoCart, removeFromCart , emptyCart} = CardSlice.actions

// export const selectCartItems = state=> state.cart.items;

// export const selectCartItemsById = (state, id)=> state.cart.items.filter(item=> item.id==id )

// export const selectCarttotal = state=> state.cart.item.reducer((total, item)=> total= total+item.price, 0);

// export default CardSlice.reducer