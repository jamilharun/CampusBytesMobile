import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const TagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    addtoTag: (state, action) => {
        state.items = [...state.items, action.payload]
    },
    removefromTag: (state, action) => {
        let newTag = [...state.items];
        let itemIndex = state.items.findIndex(item => item.id == action.payload.id);
        if(itemIndex >= 0){
            newTag.splice(itemIndex,1)
        }else{
            console.log("can't remove the item that is not added to the tag!");
        }
        state.items = newTag;
    },
  emptyTag: (state, action) => {
        state.items = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addtoTag, removefromTag , emptyTag} = TagSlice.actions

export const selectTagItems = state=> state.tag.items;

export default TagSlice.reducer