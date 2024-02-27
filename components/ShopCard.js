import React, { useState } from 'react'
import {View,
  Text, 
  TouchableWithoutFeedback, 
  Image, 
  ScrollView, 
  ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Map, Star } from 'react-native-feather';
import { urlFor } from '../apis/sanity';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShopStack from '../navigation/shopStack';

export default function ShopCard({
    _id,
    _type,
    shopName, 
    logo,
    slug,
    cover, 
    address, 
    latitude, 
    longitude, 
    description,
    isFeatured,
    isPromoted,
    isActive,
    tags}) {
  const navigation = useNavigation();

  const [activeCategory, setActiveCategory] = useState(null);
  return (
    <SafeAreaView key={_id}>

    <TouchableWithoutFeedback
      className='py-4 first:pt-0 last:pb-0'
      onPress={()=> { /*return (<ShopStack _id={_id} _type={_type} />) */}}
    >
        <View 
          style={{
          // shadowColor: themeColor.bgColor(0.2),
          shadowRadius: 7
        }}
        className=' bg-white rounded-3xl shadow-lg'>
            <View>
              <Image className=' h-36 w-full object-cover rounded-tl-3xl rounded-bl-3xl ' 
              source={{ uri: urlFor(cover).url()}}/>
              <View className='absolute flex justify-start items-end'>
                <Image className=' h-24 w-24 my-14  rounded-tr-3xl rounded-b-2xl' source={{ uri: urlFor(logo).url()}}/>
              </View>
            </View>  
            <View className='px-3 pb-4 space-y-2'>
              
              <View className=' flex flex-row justify-between'>
                <Text className=' text-lg font-bold pt-2 '>{shopName}</Text>
                <View className=' flex flex-row items-center space-x-1'>
                  <Star className=' text-EacColor-SelectiveYellow'/>
                  <Text className=' text-xs text-EacColor-BlackPearl'>
                    ratings . <Text className=' font-semibold'>{}</Text>
                  </Text>
                </View>
              </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
