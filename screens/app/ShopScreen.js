import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, TouchableOpacity, StatusBar, Text} from 'react-native';
import DishRow from '../../components/DishRow';
import CartIcon from '../../components/CartIcon';
import { urlFor } from '../../apis/sanity';
import { MapPin } from 'react-native-feather';
import ProductRow from '../../components/ProductRow';
import { useQuery} from "@tanstack/react-query";
import { Menu} from "react-native-feather";
import { axiosfetchShop, fetchShop} from '../../apis/server';
import reactQuery from '../../apis/reactQuery';

// import { useDispatch } from 'react-redux'; 

export default function ShopScreen({}) {
    const [cartHasItems, getCartHasItems] = useState(null)
    // const [sdp, setSdp] = useState(null)
    // const {params: {id, shopName, logo, cover, address, latitude, longitude, description, products, dishes, isisActiv, isVerified}} = useRoute();
    // let item = params;
    const navigation = useNavigation();

    // const [sdp, setSdp] = useState(null)
    const [err, setErr] = useState(null);

    let automaticPading = cartHasItems && 'p-10';

    const { data: sdp, isLoading, error, isFetching} = useQuery({ 
        queryKey: [`shopDisplay`], 
        queryFn: fetchShop,
        gcTime: 10000,
    });
    console.log({isLoading, isFetching, error, sdp});
    if (isLoading) {
        return (
            <View className='w-full h-64 flex justify-center items-center'>
              <Text className='text-2xl'>Loading...</Text>
            </View>
          )
    }
    if (error) setErr(error);

    return (
        <View >
        {
            cartHasItems && (
                <CartIcon/>
            )
        }
                <TouchableOpacity 
                onPress={()=>{
                  navigation.dispatch(DrawerActions.openDrawer())
                }}
                className="TahitiGold p-3 rounded-full">
                  <Menu 
                    height="20" 
                    width="20" 
                    strokeWidth={2.5} 
                    className="text-EacColor-TahitiGold"/>
        </TouchableOpacity>
        <StatusBar style='light'/>
        {/* <ScrollView>
            <View className=' relative'>
            </View>
            {
               
                    sdp?.map(data => {
                        return (
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
                            data?.dishes?.map((dish)=> <DishRow 
                                key={dish._id}
                                id={dish._id}
                                name={dish.dishName}
                                category={dish.category}
                                tags={dish.tags}
                                description={dish.description}
                                price={dish.price}
                                image={dish.image}
                                isAvailable={dish.isAvailable}
                                createdAt={dish._createdAt}
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
                                    data?.products?.map((product)=> <ProductRow
                                        key={product._id}
                                        id={product._id}
                                        name={product.productName}
                                        category={product.category}
                                        tags={product.tags}
                                        price={product.price}
                                        image={product.image}
                                        description={product.description}
                                        createdAt={product._createdAt}
                                        isAvailable={product.isAvailable}
                                    />)
                                }
                            </ScrollView>
                        </View>
                    </View>
                            </View>
                        )
                    }) 
                
            }
            
        </ScrollView> */}
    </View>
  )
}
