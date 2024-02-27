import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useReducer, useState } from 'react'
import { View, ScrollView, Image, TouchableOpacity, StatusBar, Text} from 'react-native';
import DishRow from '../../components/DishRow';
import CartIcon from '../../components/CartIcon';
import { sanityFetch, urlFor } from '../../apis/sanity';
import { ChevronLeft, MapPin } from 'react-native-feather';
import ProductRow from '../../components/ProductRow';
import { qfsdf } from '../../utils/query';
import { useQuery, useQueryClient } from "@tanstack/react-query";


// import { useDispatch } from 'react-redux'; 

export default function ShopScreen({_id, _type}) {
    const [cartHasItems, getCartHasItems] = useState(null)
    // const {params: {id, shopName, logo, cover, address, latitude, longitude, description, products, dishes, isisActiv, isVerified}} = useRoute();
    // let item = params;
    const navigation = useNavigation();

    let automaticPading = cartHasItems && 'p-10';

    // const dispatch = useDispatch();

    // useEffect(()=>{
    //     if(item && item.id){
    //         dispatch(setShop({...item}))
    //     }
    // },[])

    const fetchAllShopData = async () => {
        try {
          const sanRes = await sanityFetch(qfsdf(_id));
          if (!sanRes) {
            console.log('Error in fetching data from sanity', sanRes);
            return null
          } else {
            console.log(`fetching successful`);
            return sanRes;
          }
        } catch (error) {
          const fE = `Error in fetching data from sanity: ${error}`;
          console.log(fE);
          return null;    
        }
    };

    const { data: sdp, isLoading, error, isFetching} = useQuery({ 
        queryKey: [`${_type}:${shop._id}`], 
        queryFn: fetchAllShopData,
        gcTime: 10000,
    });
      
    console.log({isLoading, isFetching, error, dishes});
    
    if (isLoading) {
      return <Text>Loading....</Text>
    }

    if (error) {
      setErr(error);
    }

    return (
    <View >
        {
            cartHasItems && (
                <CartIcon/>
            )
        }
        <StatusBar style='light'/>
        <ScrollView>
            <View className=' relative'>
                <Image className=' w-full h-72' source={{uri: urlFor(sdp?.cover).url()}} />
                <TouchableOpacity
                    //not sure if this is will work
                    onPress={()=> navigation.goBack()} 
                    className=' absolute top-14 left-4 bg-gray-50 rounded-full shadow'>
                    <ChevronLeft 
                        strokeWidth={3} className="text-EacColor-BlackPearl" 
                        style={{ width: 28, height: 28 }}/>
                </TouchableOpacity>
            </View>

            <View style={{borderTopLeftRadius:40, borderTopRightRadius: 40}}
                className=' bg-white '>
                <View className='flex flex-row mx-3 '>
                    <Image 
                        className='h-32 w-24 object-cover rounded-xl mt-1' 
                        source={{ uri: urlFor(sdp?.logo).url()}}/>
                    <View className=' px-5'>
                        <Text className=' text-3xl font-bold'>{sdp?.shopName}</Text>
                        <View className=' flex-row space-x-2 my-1'>
                        <View className=' flex-row items-center space-x-1'>
                            {/* <Image source={require()} className=' h-4 w-4'/> */}
                            <Text className=' text-xs'>
                            <Text className=' text-EacColor-SelectiveYellow'>rating</Text>
                            {/* <Text className=' text-EacColor-BlackPearl'>
                                ({item.reviews} reviews) . <Text className=' font-semibold'>{item.category}</Text>
                            </Text> */}
                            </Text>
                        </View>
                        <View className=' flex-row items-center space-x-1'>
                            <MapPin color='gray' width='15'/>
                            <Text numberOfLines={3} className=' text-gray-700 text-xs'>Nearby.{sdp?.address}</Text>
                        </View>
                        </View>
                        <Text numberOfLines={3} className=' text-gray-500 mt-2'>{sdp?.description}</Text>
                    </View>
                </View>
            </View>
            <View className='pb-36 bg-white'>
                <Text className=' px-4 py-4 text-2xl font-bold'>Menu</Text>
                {/* dishes */}
                {
                    sdp?.dishes.map((dish)=> <DishRow 
                        key={dish._id}
                        id={dish._id}
                        name={dish.dishName}
                        category={product.category}
                        tags={product.tags}
                        description={dish.description}
                        price={dish.Price}
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
                            sdp?.products.map((product)=> <ProductRow
                                key={product._id}
                                id={product._id}
                                name={product.productName}
                                category={product.category}
                                tags={product.tags}
                                price={product.Price}
                                image={product.image}
                                description={product.description}
                                createdAt={product._createdAt}
                                isAvailable={product.isAvailable}
                            />)
                        }
                    </ScrollView>
                </View>
            </View>
            {/* <View className={automaticPading}></View> */}
        </ScrollView>
    </View>
  )
}
