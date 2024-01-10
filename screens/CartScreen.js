import React, { useEffect, useState } from 'react'
import { featured } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { AiOutlineArrowLeft, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from '../slices/ShopSlice';
import { removeFromCart, selectCartItems, selectCarttotal } from '../slices/CartSlice';
export default function CartScreen() {
    const shop = useSelector(selectShop)
    const navigation = useNavigation();
    const cardItems = useSelector(selectCartItems)
    const carttotal = useSelector(selectCarttotal)
    const [groupedItems, setGroupedItems] = useState({})
    const orderfee = carttotal * 0.001;
    const dispatch = useDispatch()


    useEffect(()=>{
        const items = cartitems.reduce((group, item)=> {
            if(group[item.id]){
                group[item.id].push(item);
            }else{
                group[item.id] = [item];
            }
            return group;
        }, {})
        setGroupedItems(items);
    }, [cardItems])
    return (
    <View className=' bg-white flex-1'>
        {/* back button */}
        <View className=' relative py-4 shadow-sm'>
            <TouchableOpacity 
            onPress={()=> navigation.goBack}
            className=' bg-EacColor-SelectiveYellow absolute z-10 rounded-full p-1 shadow top-5 left-2'>
                <AiOutlineArrowLeft stroke='white' strokeWidth={3}/>
            </TouchableOpacity>
            <View>
                <Text className=' text-center font-bold text-xl'>Your Cart</Text>
                <Text className=' text-center text-gray-500'>{restaurant.name   }</Text>
            </View>
        </View>
        {/* Pick Up only */}
        <View className=' opacity-50 bg-EacColor-SelectiveYellow flex-row px-4 items-center'>
            <Image source={require()} className=' w-20 h-20 rounded-full'>
                
            </Image>
        </View>
        {/* dishes */}
        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom:50
            }}
            className=' bg-white pt-5'>
                {
                    Object.entries(groupedItems).map(([key, items])=>{
                        let dish = items[0]
                        return(
                            <View key={key}
                                className=' flex-row items-center space-x-3 py-4 bg-white rounded-3xl mx-2 mb-3 shadow-md '>
                                    <Text className=' font-bold text-EacColor-SelectiveYellow'>{items.lenth}</Text>
                                    <Image className=' h-14 w-14 rounded-full ' source={dish.Image}/>
                                    <Text className=' flex-1 font-bold text-gray-700'>{dish.name}</Text>
                                    <Text className=' font-semibold text-base'>{dish.price}</Text>
                                    <TouchableOpacity 
                                        onPress={()=> dispatch(removeFromCart({id: dish.id}))}
                                        className=' p-1 rounded-full bg-EacColor-SelectiveYellow'>
                                            <AiOutlineMinus stroke='white' strokeWidth={2} height={20} width={20}/>
                                    </TouchableOpacity>
                            </View>
                        )
                    })
                }
        </ScrollView>
        {/* totals */}
        <View className=' bg-EacColor-TahitiGold opacity-50 p-6 px-8 rounded-t-3xl space-y-4'>
            <View className=' flex-row justify-between'>
                <Text className=' text-gray-700'>Subtotal</Text>
                <Text className=' text-gray-700'>{carttotal}</Text>
            </View>
            <View className=' flex-row justify-between'>
                <Text className=' text-gray-700'>Order fee</Text>
                <Text className=' text-gray-700'>1% | {orderFee}</Text>
            </View>
            <View className=' flex-row justify-between'>
                <Text className=' text-gray-700 font-extrabold'>total</Text>
                <Text className=' text-gray-700 font-extrabold'>{orderfee + carttotal}</Text>
            </View>
            <View>
                <TouchableOpacity 
                    onPress={()=> navigation.navigate('OrderPrepairing')}
                    className=' bg-EacColor-SelectiveYellow p-3 rounded-full'>
                    <Text className=' text-white text-center font-bold text-lg'> Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}
