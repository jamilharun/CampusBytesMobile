import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { urlFor } from '../apis/sanity'
import { Minus, Plus } from 'react-native-feather'

export default function ProductRow({id, name, category, tags, price, image, description, createdAt, isAvailable}) {
  return (
    <View className='px-4 pt-3 bg-white flex flex-col justify-center items-center'>
        <Image className='w-14 h-14 object-cover' source={{uri: urlFor(image).url(),}}/>
        <Text>{name}</Text>
        <Text>₱{price}.00</Text>
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
  )
}
