import React from 'react'
import {View, Image, TouchableOpacity, Text } from 'react-native'
import { Minus, Plus } from 'react-native-feather'
import { urlFor } from '../apis/sanity'
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import { useDispatch , useSelector } from 'react-redux';
// import { addtoCart, removeFromCart, selectCartItemsById } from '../slices/CartSlice';

export default function DishRow({id, name, category, tags, description, price, image, isAvailable, createdAt }) {
    // const dispatch = useDispatch();
    // const totalItems = useSelector(state=> selectCartItemsById(state, item.id));

    // const handleIncrease = ()=>{
    //     dispatch(addtoCart({...item}))
    // }
    // const handleDecrease = ()=>{
    //     dispatch(removeFromCart({id: item.id}))
    // }

    return (
        <View className=' flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-3 '>
            <Image 
            source={{
                uri: urlFor(image).url()
            }}
            className=' rounded-3xl' 
            style={{height: 100, width: 100}}/>
            <View className=' flex flex-1 space-y-3'>
                <View className=' pl-3'>
                    <Text className='text-xl'>{name}</Text>
                    <Text numberOfLines={3} className=' text-gray-700'>{description}</Text>
                </View>
                <View className=' flex-row justify-between pl-3 items-center'>
                    <Text className=' text-gray-700 text-lg font-bold'>
                    ₱{price}.00
                    </Text>
                    <View className='flex-row items-center'>
                        <TouchableOpacity 
                            // onPress={handleDecrease}
                            // disabled={!totalItems.length}
                            className=' p-1 rounded-full'>
                            <Minus className=' bg-EacColor-TahitiGold rounded-full' strokeWidth={2} height={20} width={20} stroke={'white'}/>
                        </TouchableOpacity>
                        <Text className=' px-3'>
                            {/* {totalItems.length} */}
                        </Text>
                        <TouchableOpacity
                            // onPress={handleIncrease}
                            className=' p-1 rounded-full'>
                            <Plus className=' bg-EacColor-TahitiGold rounded-full' strokeWidth={2} height={20} width={20} stroke={'white'}/>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    )
}
