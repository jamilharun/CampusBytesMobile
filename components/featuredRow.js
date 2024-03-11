import React from 'react'
import { View , Text, TouchableOpacity, ScrollView } from 'react-native'
import ShopCard from './ShopCard'

export default function FeaturedRow() {
  return (
    <View>
      <View className=' flex-row justify-between items-center px-4'>
        <View>
          <Text className=' font-bold font-Poppins text-lg'></Text>
          <Text className=' text-gray-500 text-xl'></Text>
        </View>
        <TouchableOpacity>
          <Text className=' bg-EacColor-SelectiveYellow font-semibold'>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showHorizontalScrollIndirator={false}
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
        className=' overflow-visible py-5'>
          {/* {
            restaurants.map((restaurant, index)=>{
              return(
                <ShopCard/>
              )
            })
          } */}
      </ScrollView>
    </View>
  )
}
