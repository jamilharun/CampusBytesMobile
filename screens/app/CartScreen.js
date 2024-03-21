import React, { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from '../../slices/ShopSlice';
// import { removefromCart, selectCartItems, selectCarttotal } from '../../slices/CartSlice';
import { Minus, Plus } from 'react-native-feather'
import { removefromCart, selectCartItems, selectCartItemsById, selectCarttotal } from '../../slices/CartSlice';
import { ChevronLeft, MapPin } from 'react-native-feather';
import { urlFor } from '../../apis/sanity';

export default function CartScreen({route, navigation}) {
    
    const shop = useSelector(selectShop)
    const cartItems = useSelector(selectCartItems)
    const carttotal = useSelector(selectCarttotal)
    const [groupedItems, setGroupedItems] = useState({})
    const dispatch = useDispatch()


    if (cartItems.length === 0) {
        navigation.goBack()
    }

    useEffect(()=>{
        
        const items = cartItems.reduce((group, item)=>{
            if (group[item._id]) {
                group[item._id].push(item)
            } else (
                group[item._id] = [item]
            ) 
            return group;
        },{})
        setGroupedItems(items)
    },[cartItems])


    useEffect(()=>{ 
    const preProcessedData = {
        groupedItems,

    }    
    })
    // console.log(groupedItems);
    return (
    <View className=' bg-white flex-1'>
        {/* back button */}
        <View className=' relative py-4 shadow-sm'>
            <View className=''>
                <TouchableOpacity 
                    onPress={()=>{navigation.goBack()}}
                    className="TahitiGold pl-3 rounded-full absolute z-50">
                    <ChevronLeft
                    className="text-EacColor-BlackPearl"
                    style={{ width: 28, height: 28 }}/>
                </TouchableOpacity>
                <Text className=' text-center font-bold text-xl'>Your Cart</Text>
                {/* <Text className=' text-center text-gray-500'>{shop.name   }</Text> */}
            </View>
        </View>
        {/* Pick Up only */}
        {/* <View className=' opacity-50 bg-EacColor-SelectiveYellow flex-row px-4 items-center'>
            <Image source={} className=' w-20 h-20 rounded-full'/>
        </View> */}
        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom:50
            }}
            className=' bg-white pt-5'>
            <View 
                style={{borderTopLeftRadius:40, borderTopRightRadius: 40}}
                className=' bg-white '>
                <View>
                    <Image className='h-32 w-full object-cover rounded-xl mt-1' source={{ uri: urlFor(shop?.cover).url()}}/>
                </View>
                <View className='flex flex-row mx-3 '>
                    {/* <Image 
                        className='h-32 w-24 object-cover rounded-xl mt-1' 
                        source={{ uri: urlFor(shop?.logo).url()}}/> */}
                    <View className=' px-5'>
                        <Text className=' text-3xl font-bold'>{shop?.shopName}</Text>
                        <View className=' flex-row space-x-2 my-1'>
                            <View className=' flex-row items-center space-x-1'>
                                <Text className=' text-xs'>
                                    <Text className=' text-EacColor-SelectiveYellow'>rating</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {
            Object.entries(groupedItems).map(([key, items])=>{
            let dish = items[0]
            // const totalItems = useSelector(state=> selectCartItemsById(state, item._id));
            console.log(dish.name, '|', items.length);
            // console.log(items);
            return(
            <View key={key}
                className=' flex-row items-center space-x-3 py-4 bg-white rounded-3xl mx-2 mb-3 shadow-md '>
                <Text className=' font-bold text-EacColor-SelectiveYellow'>{items.lenth}</Text>
                <Image className=' h-14 w-14 rounded-full ' source={{uri: urlFor(dish.image).url()}}/>
                <Text className=' flex-1 font-bold text-gray-700'>{dish.name}</Text>
                <View>
                    <Text className=' font-semibold text-base'>₱{dish.price}</Text>
                    <Text className=' font-semibold text-base'>qty: {items.length}</Text>
                    <Text className=' font-semibold text-base'>₱{dish.price * items.length}</Text>
                </View>
                <TouchableOpacity 
                    onPress={()=> dispatch(removefromCart({_id: dish._id}))}
                    className=' p-1 rounded-full bg-EacColor-SelectiveYellow'>
                        <Minus className=' bg-EacColor-TahitiGold rounded-full' strokeWidth={2} height={20} width={20} stroke={'white'}/>
                </TouchableOpacity>
            </View>
            )
            })
            }
        </ScrollView>
        {/* totals */}
        
        <View className=' bg-EacColor-TahitiGold opacity-50 p-6 px-8 rounded-t-3xl space-y-4'>
            <View className=' flex-row justify-between'>
                <Text className=' text-EacColor-BlackPearl'>Subtotal</Text>
                <Text className=' text-EacColor-BlackPearl'>{carttotal}</Text>
            </View>
            {/* <View className=' flex-row justify-between'>
                <Text className=' text-EacColor-BlackPearl'>Order fee</Text>
                <Text className=' text-EacColor-BlackPearl'>?</Text>
            </View> */}
            <View className=' flex-row justify-between'>
                <Text className=' text-EacColor-BlackPearl font-black'>total</Text>
                <Text className=' text-EacColor-BlackPearl font-extrabold'>{carttotal}</Text>
            </View>
            <View>
                <TouchableOpacity 
                    onPress={()=>{
                        console.log('groupedItems: ',groupedItems);
                        navigation.navigate('Pay', groupedItems)
                    }}
                    className=' bg-EacColor-DeepFir p-3 rounded-full'>
                    <Text className=' text-white text-center font-bold text-lg'> Pick Payment Method</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}
