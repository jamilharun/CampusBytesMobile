import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemsById } from '../slices/CartSlice';
import { AntDesign } from '@expo/vector-icons';
import { addtoTag, removefromTag, selectTagItemsById } from '../slices/TagSlice';

export default function TagRow({tag}) {
    const dispatch = useDispatch();
    let tagbyid = useSelector(state => selectTagItemsById(state, tag._id))
    
    const handleIncrease = ()=>{
        dispatch(addtoTag({
            _id: tag._id,
            name: tag.tagName,
            _type: tag._type,
        }))
    }

    const handleDecrease = ()=>{
        dispatch(removefromTag({_id: tag._id}))
    }

    return (
        <TouchableOpacity 
        onPress={()=>{
            if (tagbyid.length > 0) {
                handleDecrease()
            } else {
                handleIncrease()
            }
        }}
        className={`flex flex-row justify-between items-center p-2 border-b border-gray-300 ${tagbyid.length > 0 ? 'bg-EacColor-TahitiGold rounded-full' : ''}`}>
            <Text className='text-xl'>{tag.tagName}</Text>
            {
            tagbyid.length > 0 ?
                <View
                    // onPress={handleDecrease}
                    // disabled={!tagbyid.length}
                            >
                    <AntDesign name="minus" size={24} color="black" />
                </View> :
                <View 
                // onPress={handleIncrease}
                className=''>
                    <AntDesign name="plus" size={24} color="black" />
                </View>
            }
        </TouchableOpacity>
  )
}