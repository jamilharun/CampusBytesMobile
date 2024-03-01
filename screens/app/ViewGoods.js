import React from 'react'
import { View, ScrollView, Image, TouchableOpacity, StatusBar, Text} from 'react-native';
import DishRow from '../../components/DishRow';
import {  urlFor } from '../../apis/sanity';
import { ChevronLeft, MapPin } from 'react-native-feather';
import ProductRow from '../../components/ProductRow';

export default function ViewGoods({route, navigation}) {
  const {data} = route.params;
  return (
    <View >
        <TouchableOpacity 
        onPress={()=>{navigation.goBack()}}
        className="TahitiGold p-3 rounded-full">
          <ChevronLeft
          className="text-EacColor-RedOxide"
          style={{ width: 40, height: 40 }}
        />
            <ChevronLeft
              className="text-EacColor-BlackPearl"
              style={{ width: 28, height: 28 }}
            />
        </TouchableOpacity>
        <StatusBar style='light'/>
        <ScrollView>
            <View className=' relative'>
                {/* <Image className=' w-full h-72' source={{uri: urlFor(sdp?.cover).url()}} /> */}
            </View>
            <View key={data?._id && data._id}>
                <View 
                    style={{borderTopLeftRadius:40, borderTopRightRadius: 40}}
                    className=' bg-white '>
                    <View className='flex flex-row mx-3 '>
                        {
                            data?.logo && (
                                <Image 
                                    className='h-32 w-24 object-cover rounded-xl mt-1' 
                                    source={{ uri: urlFor(data?.logo).url()}}/>
                            )
                        }
                        <View className=' px-5'>
                            <Text className=' text-3xl font-bold'>{data?.shopName}</Text>
                            <View className=' flex-row space-x-2 my-1'>
                                <View className=' flex-row items-center space-x-1'>
                                    {/* <Image source={require()} className=' h-4 w-4'/> */}
                                    <Text className=' text-xs'>
                                    <Text className=' text-EacColor-SelectiveYellow'>rating</Text>
                                    {/* <Text className=' text-EacColor-BlackPearl'>
                                        ({data.reviews} reviews) . <Text className=' font-semibold'>{item.category}</Text>
                                    </Text> */}
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
                                            <Text className=' text-gray-500 text-xs'>{tag?.tagName}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
                <View className='pb-36 bg-white'>
                    <Text className=' px-4 py-4 text-2xl font-bold'>Menu</Text>
                    {/* dishes */}
                    {
                        data?.dishes?.map((dish)=> <DishRow 
                            key={dish._id}
                            id={dish._id}
                            name={dish.dishName}
                            category={dish.category}
                            tags={dish.tags}
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
                                data?.products?.map((product)=> <ProductRow
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
            </View>   
            {/* <View className={automaticPading}></View> */}
        </ScrollView>
</View>
)
}