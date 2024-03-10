import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
// import { useSelector } from 'react-redux'
import { selectCartItems, selectCarttotal } from '../slices/CartSlice';
import { useSelector } from 'react-redux';

export default function CartIcon() {
    const navigation = useNavigation();
    const cartItems = useSelector(selectCartItems);
    const carttotal = useSelector(selectCarttotal);
    // if(!cartItems.length) return null;
  return (
    <View className=' absolute bottom-5 w-full z-50'>
        <TouchableOpacity 
        onPress={()=> navigation.navigate('Cart')}
        className=' bg-EacColor-SelectiveYellow flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg'>
            <View className=' p-2 px-4 rounded-full bg-EacColor-TahitiGold'>
                <Text className=' font-extrabold text-white text-lg'>{cartItems.length}</Text>

            </View>
            <Text className=' flex-1 text-center font-extrabold text-white text-lg'>
                View Cart

            </Text>
            <Text className=' font-extrabold text-white text-lg'>
                {carttotal}
            </Text>
        </TouchableOpacity>

    </View>
  )
}
