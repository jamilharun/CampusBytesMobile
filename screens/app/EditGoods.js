import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native'
import React from 'react'
import { ChevronLeft, MapPin } from 'react-native-feather';
import { urlFor } from '../../apis/sanity';


export default function EditGoods({ route, navigation }) {
  const {data} = route.params;
  return (
    <View>
      <TouchableOpacity 
            onPress={()=>{navigation.goBack()}}
            className="TahitiGold p-3 rounded-full">
              <ChevronLeft
              className="text-EacColor-RedOxide"
              style={{ width: 40, height: 40 }}
            />
      </TouchableOpacity>
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
        <ScrollView horizontal
          showsHorizontalScrollIndicator={false}
          className=" overflow-visible"
          contentContainerStyle={{
            paddingHorizontal:15
          }}>
          {
            data?.products?.map((product)=>{
              return (
                <TouchableOpacity 
                  key={product._id} 
                  className={` ml-3 w-60 rounded-2xl border-4 ${product.isAvailable ? '  border-EacColor-TahitiGold' : ' border-gray-500 opacity-75'}`}
                  onPress={()=>{navigation.navigate('EditProduct', {product})}}>
                  <Image className=' w-full h-72 rounded-t-2xl' source={{uri: urlFor(product?.image).url()}} />
                  <View className='flex flex-col px-5'>
                    <Text className='text-xl font-extrabold'>{product.productName}</Text>
                    <Text className='text-lg font-bold'>{product.Price}</Text>
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
          <View className='mb-20'>
              {/* <Text className='text-3xl font-bold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta a est officia soluta vel aliquid molestiae fugit at vero sit quos in, omnis porro, maxime obcaecati id nam nulla aspernatur?</Text> */}
          </View>
      </ScrollView>
    </View>
  )
}