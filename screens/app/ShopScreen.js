import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, TouchableOpacity, StatusBar, Text} from 'react-native';
import DishRow from '../../components/DishRow';
import CartIcon from '../../components/CartIcon';
import { urlFor } from '../../apis/sanity';
import ProductRow from '../../components/ProductRow';
import { ChevronLeft, MapPin } from 'react-native-feather';
import { useDispatch } from 'react-redux';
import { setShop } from '../../slices/ShopSlice';
import { emptyCart } from '../../slices/CartSlice';

export default function ShopScreen({route, navigation}) {
    const {data} = route.params;
    const [cartHasItems, getCartHasItems] = useState(null)
    const [err, setErr] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (data && data._id) {
            dispatch(setShop({
                id: data._id,
                shopName: data.shopName,
                shopOwner: data.shopOwner,
                cover: data.cover,
                logo: data.logo,
                type: data._type,
                address: data.address,
                latitude: data.latitude,
                longitude: data.longitude,
                isActive: data.isActive,
                isFeatured: data.isFeatured,
                isPromoted: data.isPromoted,
                createdAt: data._createdAt,
                updatedAt: data._updatedAt,
            }))
        }
    },[]);

    let automaticPading = cartHasItems && 'p-10';
    return (
        <View >
            <CartIcon/>
            <TouchableOpacity 
                    onPress={()=>{
                        navigation.goBack()
                        dispatch(emptyCart())
                    }}
                    className="TahitiGold p-3 rounded-full">
                      <ChevronLeft
                    className="text-EacColor-BlackPearl"
                    style={{ width: 28, height: 28 }}
                    />
            </TouchableOpacity>
            <StatusBar style='light'/>
            <ScrollView>
                <View className=' relative'>
                </View>
                <View key={data._id}>
                    <View 
                    style={{borderTopLeftRadius:40, borderTopRightRadius: 40}}
                    className=' bg-white '>
                        <View>
                            <Image className='h-32 w-full object-cover rounded-xl mt-1' source={{ uri: urlFor(data?.cover).url()}}/>
                        </View>
                        <View className='flex flex-row mx-3 '>
                            <Image 
                                className='h-32 w-24 object-cover rounded-xl mt-1' 
                                source={{ uri: urlFor(data?.logo).url()}}/>
                                <View className=' px-5'>
                                    <Text className=' text-3xl font-bold'>{data?.shopName}</Text>
                                    <View className=' flex-row space-x-2 my-1'>
                                        <View className=' flex-row items-center space-x-1'>
                                            <Text className=' text-xs'>
                                            <Text className=' text-EacColor-SelectiveYellow'>rating</Text>
                                            </Text>
                                        </View>
                                        <View className=' flex-row items-center space-x-1'>
                                            <MapPin color='gray' width='15'/>
                                            <Text numberOfLines={3} className=' text-gray-700 text-xs'>Nearby.{data?.address}</Text>
                                        </View>
                                    </View>
                                    <Text numberOfLines={3} className=' text-gray-500 mt-2'>{data?.description}</Text>
                                    {
                                        data?.tags?.map((tag) => {
                                            return (
                                                <View key={tag._id} className=' flex-row items-center space-x-1'>
                                                    <Text className=' text-gray-500 text-xs'>{tag.tagName}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                        <View className='pb-36 bg-white'>
                            <Text className=' px-4 py-4 text-2xl font-bold'>Menu</Text>
                            {
                                data?.dishes?.map((dish)=> 
                                
                                dish.isAvailable && <DishRow
                                    item={dish}
                                    key={dish._id}
                                />)
                            }
                            <View>
                                <Text className=' px-4 py-4 text-2xl font-bold'>Others</Text>
                                <ScrollView 
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className=" overflow-visible"
                                contentContainerStyle={{
                                    paddingHorizontal:15
                                }}>
                                    {
                                        data?.products?.map((product)=>
                                        product.isAvailable && <ProductRow
                                            item={product}
                                            key={product._id}
                                        />)
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    </View>
            </ScrollView>
        </View> 
  )
}
