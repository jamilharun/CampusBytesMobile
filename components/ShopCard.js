import React, { useState } from 'react'
import {View,Text, TouchableWithoutFeedback, Image, ScrollView, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Map, Star } from 'react-native-feather';
import { urlFor } from '../apis/sanity';

export default function ShopCard({id, shopName, logo, cover, address, latitude, longitude, description, products, dishes, isisActiv, isVerified}) {
  const navigation = useNavigation();

  const [activeCategory, setActiveCategory] = useState(null);
  return (
    <TouchableWithoutFeedback key={id} 
    // onPress={()=> navigation.navigate('Shop', {id, shopName, logo, cover, address, latitude, longitude, description, products, dishes, isisActiv, isVerified})}
    >
        <View 
        style={{
          // shadowColor: themeColor.bgColor(0.2),
          shadowRadius: 7
        }}
        className=' bg-white rounded-3xl shadow-lg'>
            <View>
              <Image className=' h-36 w-full object-cover rounded-tl-3xl rounded-bl-3xl ' source={{ uri: urlFor(cover).url()}}/>
              <View className='absolute flex justify-start items-end'>
                <Image className=' h-24 w-24 my-14  rounded-tr-3xl rounded-b-2xl' source={{ uri: urlFor(logo).url()}}/>
              </View>
            </View>  
            <View className='px-3 pb-4 space-y-2'>
              <Text className='flex'>
                <Text className=' text-lg font-bold pt-2 '>{shopName}</Text>
              </Text>
              <View className=' flex flex-row items-center space-x-1'>
                <Star className=' text-EacColor-SelectiveYellow'/>
                <Text className=' text-xs'>
                  <Text className=' text-EacColor-BlackPearl'>
                    ratings . <Text className=' font-semibold'>{}</Text>
                  </Text>
                </Text>
              </View>
              <View>
                <ScrollView 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className=" overflow-visible"
                  contentContainerStyle={{
                  paddingHorizontal:15
              }}>
                {
                  // console.log(dishes)
                  dishes ? (
                    dishes?.map((dish)=>{
                      // let isActive = dish._id==activeCategory;
                      // let btnClass = isActive? ' bg-gray-600' : 'bg-gray-200';
                      // let textClass = isActive? ' font-semibold text-gray-600' : 'text-gray-200';
                      return(
                        <View key={dish?._id} className=' flex justify-center items-center mr-4'>
                          {/* <Text>sdfsdfdsf</Text> */}
                          <Image 
                            className=' rounded-xl' style={{width:95, height: 95}}
                            source={{
                                uri: urlFor(dish?.image).url(),
                            }}/>
                        </View>
                      )
                    })

                  ) : (
                    <View className=" flex justify-center items-center">
                      <ActivityIndicator size={"large"} />
                    </View>
                  )
                }

                {
                  products.map((product)=>{
                    return(
                      <View key={product?._id} className=' flex justify-center items-center mr-4'>
                        <Image 
                          className=' rounded-xl' style={{width:95, height: 95}}
                          source={{
                              uri: urlFor(product?.image).url(),
                          }}/>
                      </View>
                    )
                  })
                }
                </ScrollView>
              </View>
              {/* <View className=' flex-row items-center space-x-1'>
                <Map color='gray' width='15'/>
                <Text className=' text-gray-700 text-xs'>Nearby . {address}</Text>
              </View> */}
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}
