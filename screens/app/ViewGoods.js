import React from 'react'
import { View, ScrollView, Image, TouchableOpacity, StatusBar, Text} from 'react-native';
import DishRow from '../../components/DishRow';
import {  urlFor } from '../../apis/sanity';
import { ChevronLeft, MapPin } from 'react-native-feather';
import ProductRow from '../../components/ProductRow';
import { AntDesign } from '@expo/vector-icons';

export default function ViewGoods({route, navigation}) {
  const {data} = route.params;

  
  const dishType = 'dish';
  const productType = 'product';
  return (
    <View >
        <View className="w-full flex flex-row justify-between items-center bg-white pr-4 shadow-sm">
            <TouchableOpacity 
            onPress={()=>{navigation.goBack()}}
            className="TahitiGold p-3 rounded-full">
                <ChevronLeft
                className="text-EacColor-BlackPearl"
                style={{ width: 28, height: 28 }}
                />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-EacColor-TahitiGold">
                View Shop mode
            </Text>
        </View>
        <StatusBar style='light'/>
        <ScrollView>
            <View className='my-4 mx-2'>
                <Text className='text-3xl font-bold'>
                    Dishes
                </Text> 
            </View>

            <ScrollView horizontal
            showsHorizontalScrollIndicator={false}
            className=" overflow-visible"
            contentContainerStyle={{
                paddingHorizontal:15
            }}> 
                <TouchableOpacity 
                    className={' ml-3 w-60 rounded-2xl border-4  border-gray-500 opacity-75'} //if dish is isAvailable, add border color green. if not add gray border
                    onPress={()=>{navigation.navigate('addGoods', dishType)}}>
                    <View className=' w-full h-72 rounded-t-2xl bg-gray-300 flex justify-center items-center'>
                        <AntDesign name="plus" size={44} color="black" />
                    </View>
                    <View className='flex flex-col px-5'>
                    <Text className='text-xl font-extrabold'>add new dish</Text>
                    <Text className='text-lg font-bold'>₱ price</Text>
                    </View>
                </TouchableOpacity>
            {
            data?.dishes?.map((dish)=>{
                return (
                <TouchableOpacity 
                    key={dish._id}
                    className={` ml-3 w-60 rounded-2xl border-4 ${dish.isAvailable ? '  border-EacColor-TahitiGold' : ' border-gray-500 opacity-75'}`} //if dish is isAvailable, add border color green. if not add gray border
                    onPress={()=>{navigation.navigate('EditDish', {dish})}}>
                    <Image className=' w-full h-72 rounded-t-2xl' source={{uri: urlFor(dish?.image).url()}} />
                    <View className='flex flex-col px-5'>
                    <Text className='text-xl font-extrabold'>{dish.dishName}</Text>
                    <Text className='text-lg font-bold'>₱{dish.price}</Text>
                    
                    <View className='flex flex-row space-x-2'>
                        <ScrollView horizontal={true}>
                        {
                            dish?.tags?.map((tag)=>{
                            return (
                                <View key={tag._id} className='bg-EacColor-TahitiGold p-1 rounded-full'>
                                <Text className='text-white'>{tag.tagName}</Text>
                                </View>
                            )
                            })
                        }
                        </ScrollView>
                    </View>
                    </View>
                </TouchableOpacity>
                )
            })
            }
            </ScrollView>
            <View className='my-4 mx-2'>
                <Text className='text-3xl font-bold'>
                    Products
                </Text> 
            </View>

            {/* product */}
            <ScrollView horizontal
            showsHorizontalScrollIndicator={false}
            className=" overflow-visible"
            contentContainerStyle={{
                paddingHorizontal:15
            }}>
                <TouchableOpacity 
                    className={' ml-3 w-60 rounded-2xl border-4  border-gray-500 opacity-75'} //if dish is isAvailable, add border color green. if not add gray border
                    onPress={()=>{navigation.navigate('addGoods', productType)}}>
                    <View className=' w-full h-72 rounded-t-2xl bg-gray-300 flex justify-center items-center'>
                        <AntDesign name="plus" size={44} color="black" />
                    </View>
                    <View className='flex flex-col px-5'>
                    <Text className='text-xl font-extrabold'>add new product</Text>
                    <Text className='text-lg font-bold'>₱ price</Text>
                    </View>
                </TouchableOpacity>
            {
                data?.products?.map((product)=>{
                return (
                    <TouchableOpacity 
                    key={product?._id} 
                    className={` ml-3 w-60 rounded-2xl border-4 ${product.isAvailable ? '  border-EacColor-TahitiGold' : ' border-gray-500 opacity-75'}`}
                    onPress={()=>{navigation.navigate('EditProduct', {product})}}>
                    <Image className=' w-full h-72 rounded-t-2xl' source={{uri: urlFor(product?.image).url()}} />
                    <View className='flex flex-col px-5'>
                        <Text className='text-xl font-extrabold'>{product.productName}</Text>
                        <Text className='text-lg font-bold'>{product.price}</Text>
                        <View className='flex flex-row space-x-2'>
                        <ScrollView horizontal={true}>
                            {
                            product?.tags?.map((tag)=>{
                                return (
                                <View key={tag._id} className='bg-EacColor-TahitiGold p-1 rounded-full'>
                                    <Text className='text-white'>{tag.tagName}</Text>
                                </View>
                                )
                            })
                            }
                        </ScrollView>
                        </View>
                    </View>
                    </TouchableOpacity>
                )
                })
            }
            </ScrollView>
        </ScrollView>
</View>
)
}