import React, { useEffect } from 'react'
import {View, Image, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Minus, Plus } from 'react-native-feather'
import { urlFor } from '../apis/sanity'
import { useDispatch , useSelector } from 'react-redux';
import { addtoCart, removefromCart, selectCartItemsById } from '../slices/CartSlice';

export default function DishRow({item}) {
    const dispatch = useDispatch();
    const totalItems = useSelector(state=> selectCartItemsById(state, item._id));

    const handleIncrease = ()=>{
        dispatch(addtoCart({
            _id: item._id,
            name: item.dishName,
            _type: item._type,
            price: item.price,
            image: item.image,
            shop: item?.shop,
        }))
    }
    const handleDecrease = ()=>{
        dispatch(removefromCart({_id: item._id}))
    }

    // useEffect(()=>{
    //     console.log(totalItems);
    // }, [totalItems])
    console.log(item);
    return (
        <View className=' flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-3 '>
         
            <Image 
            source={{
                uri: urlFor(item.image).url()
            }}
            className=' rounded-3xl' 
            style={{height: 100, width: 100}}/>
            <View className=' flex flex-1 space-y-3'>
                <View className=' mx-3 '>
                    <Text className='text-xl'>{item.dishName}</Text>
                    <Text numberOfLines={2} className=' text-gray-700'>{item.description}</Text>
                    <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className=" overflow-hidden mt-3 flex flex-row w-full"
                    contentContainerStyle={{paddingHorizontal:15}}>
                        {
                            item?.tags?.map((tag) => {
                                console.log(tag.tagName)
                                return (
                                    <View key={tag?._id} className=' mx-1 flex-row items-center space-x-1 bg-EacColor-SelectiveYellow px-3 justify-center rounded-full '>
                                        <Text className=' text-EacColor-BlackPearl'>{tag?.tagName}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View className=' flex-row justify-between pl-3 items-center'>
                    <Text className=' text-gray-700 text-lg font-bold'>
                    ₱{item.price}
                    </Text>
                    <View className='flex-row items-center'>
                        <TouchableOpacity 
                            onPress={handleDecrease}
                            disabled={!totalItems.length}
                            className=' p-1 rounded-full'>
                            <Minus className=' bg-EacColor-TahitiGold rounded-full' strokeWidth={2} height={20} width={20} stroke={'white'}/>
                        </TouchableOpacity>
                        <Text className=' px-3'>
                            {totalItems.length}
                        </Text>
                        <TouchableOpacity
                            onPress={handleIncrease}
                            className=' p-1 rounded-full'>
                            <Plus className=' bg-EacColor-TahitiGold rounded-full' strokeWidth={2} height={20} width={20} stroke={'white'}/>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    )
}
