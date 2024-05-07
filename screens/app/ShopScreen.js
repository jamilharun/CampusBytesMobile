import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, TouchableOpacity, StatusBar, Text} from 'react-native';
import DishRow from '../../components/DishRow';
import CartIcon from '../../components/CartIcon';
import { urlFor } from '../../apis/sanity';
import ProductRow from '../../components/ProductRow';
import { ChevronLeft, MapPin } from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import { selectShop, setShop } from '../../slices/ShopSlice';
import { emptyCart } from '../../slices/CartSlice';
import { selectFilterAmount } from '../../slices/FilterSlice';
import { dish } from '../../constants/predefineData';
import { selectTagItems } from '../../slices/TagSlice';

export default function ShopScreen({route, navigation}) {
    const {data} = route.params;
    // const shop = useSelector(selectShop);
    // console.log(data);
    const [cartHasItems, getCartHasItems] = useState(null)
    const [err, setErr] = useState(null);
    const dispatch = useDispatch();
    const setedFilterAmount = useSelector(selectFilterAmount)
    const selectedTags = useSelector(selectTagItems)

    const [dishData, getDishData] = useState(data.dishes)
    const [prodData, getProdData] = useState(data.products)

    useEffect(()=>{
        if (data && data._id) {
            dispatch(emptyCart())
            dispatch(setShop({
                id: data._id,
                shopName: data.shopName,
                shopOwner: data.shopOwner,
                cover: data.cover,
                logo: data.logo,
                qrcode: data.qrcode,
                accNum: data.accNum,
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
    
    // console.log(setedFilterAmount); // Log the value to verify it's defined and holds an expected value
    console.log('selected tags', selectedTags);
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
                            {
                                selectedTags.length > 0 ? (
                                    <Text className=' px-4 py-4 text-xl font-bold'>Selected tag filter</Text>
                                ) : null
                            }
                            <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className=" overflow-visible"
                            contentContainerStyle={{
                                paddingHorizontal:15
                            }}>
                                {
                                    selectedTags.length > 0 ? (
                                        selectedTags.map((tag) => {
                                            // console.log('filter: ', tag.name);
                                            return <View key={tag._id} className=' mx-1 flex-row items-center space-x-1 bg-EacColor-SelectiveYellow px-3 justify-center rounded-full '>
                                                <Text className=' text-EacColor-BlackPearl'>{tag.name}</Text>
                                            </View>
                                        })
                                    ) : null
                                }
                            </ScrollView>
                            <View className='flex flex-row items-center justify-between'>
                                <Text className=' px-4 py-4 text-2xl font-bold'>Menu</Text>
                                {
                                    setedFilterAmount > 10 && 
                                    <View className='flex flex-row items-center justify-center'>
                                        <Text className='text-xl'>Your Budget:</Text>
                                        <Text className=' pr-4 py-4 text-2xl font-bold'> {setedFilterAmount}</Text>
                                    </View>
                                }
                            </View>
                            
                            {
                                selectedTags.length === 0 ? ( // if selectedTags is empty array
                                    setedFilterAmount === '0' || 
                                    setedFilterAmount === '' || 
                                    !setedFilterAmount ? (
                                    dishData?.map((dish) => (
                                        <DishRow item={dish} key={dish._id} />
                                    ))
                                    ) : null
                                ) : null
                            }

                            {
                                selectedTags.length === 0 &&
                                setedFilterAmount ? (
                                    dishData?.map((dish) => (
                                    // Conditionally render DishRow based on setedFilterAmount
                                    dish.price <= setedFilterAmount ? (
                                        <DishRow key={dish._id} item={dish} />
                                    ) : null
                                    ))
                                ) : null
                            }

                            {
                                selectedTags.length > 0 ? ( // if selectedTags is empty array
                                    setedFilterAmount === '0' || 
                                    setedFilterAmount === '' || 
                                    !setedFilterAmount ? (
                                    dishData?.map((dish) => {
                                        if (dish.tags.some(dishtag => selectedTags.some(tag => dishtag._id === tag._id ))) {
                                            return <DishRow key={dish._id} item={dish} />;
                                        } else {
                                            return null;
                                        }
                                    })
                                    ) : null
                                ) : null
                            }

                            {
                                selectedTags.length > 0 && setedFilterAmount ? (
                                    dishData?.map((dish) => {
                                        // Using array.some() to check if any tag matches
                                        if (dish.tags.some(dishtag => selectedTags.some(tag => dishtag._id === tag._id && dish.price <= setedFilterAmount))) {
                                            return <DishRow key={dish._id} item={dish} />;
                                        } else {
                                            return null;
                                        }
                                    })
                                ) : null
                            }


                            {/* {
                                selectedTags.length > 0 &&
                                setedFilterAmount ? (
                                    dishData?.map((dish) => {
                                        dish.price <= setedFilterAmount ? (
                                            selectedTags.map((tag)=>{
                                                dish.tags.map((dishtag)=>{
                                                    dishtag._id === tag._id ? (
                                                        <DishRow key={dish._id} item={dish} />
                                                    ) : null
                                                })
                                            })
                                        ) : null
                                    })
                                ) : null
                            } */}

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
                                    selectedTags.length === 0 ? ( // if selectedTags is empty array
                                        setedFilterAmount === '0' || 
                                        setedFilterAmount === '' || 
                                        !setedFilterAmount ? (
                                        prodData?.map((prod) => (
                                            <ProductRow item={prod} key={prod._id} />
                                        ))
                                        ) : null
                                    ) : null
                                }

                                
                                {
                                    selectedTags.length === 0 &&
                                    setedFilterAmount ? (
                                        prodData?.map((prod) => (
                                            // Conditionally render DishRow based on setedFilterAmount
                                            prod.Price <= setedFilterAmount ? (
                                              <ProductRow key={prod._id} item={prod} />
                                            ) : null
                                        ))
                                    ) : null
                                }

                                {
                                    selectedTags.length > 0 ? ( // if selectedTags is empty array
                                        setedFilterAmount === '0' || 
                                        setedFilterAmount === '' || 
                                        !setedFilterAmount ? (
                                            prodData?.map((prod) => {
                                                // Using array.some() to check if any tag matches
                                                if (prod?.tags?.some(prodtag => selectedTags?.some(tag => prodtag?._id === tag?._id ))) {
                                                    return <ProductRow key={prod._id} item={prod} />
                                                } else {
                                                    return null;
                                                }
                                            })
                                        ) : null
                                    ) : null
                                }

                                {
                                    selectedTags.length > 0 && setedFilterAmount ? (
                                        prodData?.map((prod) => {
                                            // Using array.some() to check if any tag matches
                                            if (prod?.tags?.some(prodtag => selectedTags?.some(tag => prodtag?._id === tag?._id && prod.Price <= setedFilterAmount))) {
                                                return <ProductRow key={prod._id} item={prod} />
                                            } else {
                                                return null;
                                            }
                                        })
                                    ) : null
                                }

                                {/* {setedFilterAmount === '0' || setedFilterAmount === '' || !setedFilterAmount ? (
                                  prodData?.map((prod) => (
                                    <ProductRow item={prod} key={prod._id} />
                                  ))
                                ) : null} */}

                                {/* {
                                prodData?.map((prod) => (
                                  // Conditionally render DishRow based on setedFilterAmount
                                  prod.Price <= setedFilterAmount ? (
                                    <ProductRow key={prod._id} item={prod} />
                                  ) : null
                                ))
                                } */}

                                </ScrollView>
                            </View>
                        </View>
                    </View>
            </ScrollView>
        </View> 
  )
}
