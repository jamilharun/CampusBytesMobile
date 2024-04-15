import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { urlFor } from '../apis/sanity'
import { Minus, Plus } from 'react-native-feather'
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart, removefromCart, selectCartItemsById } from '../slices/CartSlice';

export default function ProductRow({item}) {
    const dispatch = useDispatch();
    const totalItems = useSelector(state=> selectCartItemsById(state, item?._id));

    const handleIncrease = ()=>{
        dispatch(addtoCart({
            _id: item?._id,
            name: item.productName,
            _type: item._type,
            price: item.Price,
            image: item.image,
            shop: item?.shop,
        }))
    }
    const handleDecrease = ()=>{
        dispatch(removefromCart({_id: item?._id}))
    }

    // useEffect(()=>{
    //     console.log(totalItems);
    // }, [totalItems])
    
  return (
    <View className='mx-4 pt-3 bg-white flex w-40 flex-col justify-center items-center'>
        <Image className='w-36 h-36 object-cover rounded-xl' source={{uri: urlFor(item?.image).url(),}}/>
        <Text className='text-xl'>{item.productName}</Text>
        <View className=''>
            <Text numberOfLines={2} className=' text-gray-700'>{item.description}</Text>
        </View>
        <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        className=" overflow-hidden mt-3 flex flex-row w-full"
        contentContainerStyle={{paddingHorizontal:15}}>
            {
                item?.tags?.map((tag) => {
                    // console.log(tag.tagName)
                    return (
                        <View key={tag?._id} className=' mx-1 flex-row items-center space-x-1 bg-EacColor-SelectiveYellow px-3 justify-center rounded-full '>
                            <Text className=' text-EacColor-BlackPearl'>{tag?.tagName}</Text>
                        </View>
                    )
                })
            }
        </ScrollView>            
        
        <Text className=' text-gray-700 text-lg font-bold'>₱{item.Price}</Text>
        <View className='flex-row items-center pt-3'>
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
  )
}

