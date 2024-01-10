import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useReducer } from 'react'
import { View, ScrollView, Image, TouchableOpacity, StatusBar} from 'react-native';
import { AiOutlineArrowLeft } from "react-icons/ai";
import DishRow from '../components/DishRow';
import CartIcon from '../components/CartIcon';

import { useDispatch } from 'react-redux'; 

export default function ShopScreen() {
    const {params} = useRoute();
    let item = params;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(item && item.id){
            dispatch(setShop({...item}))
        }
    },[])
    return (
    <View>
        <CartIcon/>
        <StatusBar style='light'/>
        <ScrollView>
            <View className=' relative'>
                <Image className=' w-full h-72' source={item.image}/>
                <TouchableOpacity
                    onPress={()=> navigation.goBack()} 
                    className=' absolute top-14 left-4 bg-gray-50 rounded-full shadow'>
                    <AiOutlineArrowLeft strokeWidth={3} stroke=''/>
                </TouchableOpacity>
            </View>
            <View style={{borderTopLeftRadius:40, borderTopRightRadius: 40}}
                className=' bg-white mt-12 pt-6'>
                <View className=' px-5'>
                    <Text className=' text-3xl font-bold'>{item.name}</Text>
                    <View className=' flex-row space-x-2 my-1'>
                    <View className=' flex-row items-center space-x-1'>
                        <Image source={require()} className=' h-4 w-4'/>
                        <Text className=' text-xs'>
                        <Text className=' text-EacColor-SelectiveYellow'>{item.stars}</Text>
                        <Text className=' text-EacColor-BlackPearl'>
                            ({item.reviews} reviews) . <Text className=' font-semibold'>{item.category}</Text>
                        </Text>
                        </Text>
                    </View>
                    <View className=' flex-row items-center space-x-1'>
                        <BiSolidMapPin color='gray' width='15'/>
                        <Text className=' text-gray-700 text-xs'>Nearby.{item.address}</Text>
                    </View>
                    </View>
                    <Text className=' text-gray-500 mt-2'>{item.description}</Text>
                </View>
            </View>
            <View className='pb-36 bg-white'>
                <Text className=' px-4 py-4 text-2xl font-bold'>Menu</Text>
                {/* dishes */}
                {
                    item.dishes.map((dish, index)=> <DishRow item={{dish}} key={index}/>)
                }
            </View>
        </ScrollView>
    </View>
  )
}
