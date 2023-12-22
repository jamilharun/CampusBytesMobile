import React from 'react'
import {View,Text, TouchableWithoutFeedback, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Map } from 'react-native-feather';

export default function ShopCard(item) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={()=> navigation.navigate('Shop', {})}>
        <View 
        style={{
          // shadowColor: themeColor.bgColor(0.2),
          shadowRadius: 7
        }}
        className=' mr-6 bg-white rounded-3xl shadow-lg'>
            {/* <Image className=' h-36 w-64 rounded-t-3xl' /> */}  
            <View className='px-3 pb-4 space-y-2'>
              <Text className=' text-lg font-bold pt-2'></Text>
              <View className=' flex-row items-center space-x-1'>
                {/* <Image  className=' h-4 w-4'/> */}
                <Text className=' text-xs'>
                  <Text className=' text-EacColor-SelectiveYellow'></Text>
                  <Text className=' text-EacColor-BlackPearl'>
                     . <Text className=' font-semibold'></Text>
                  </Text>
                </Text>
              </View>
              <View className=' flex-row items-center space-x-1'>
                <Map color='gray' width='15'/>
                <Text className=' text-gray-700 text-xs'>Nearby.</Text>
              </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}
