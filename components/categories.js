import React, { useState } from 'react'
import { Image } from 'react-native';
import { ScrollView, TouchableOpacity, View } from 'react-native'

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);
  return (
    <View className=' mt-4'>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        className=" overflow-visible"
        contentContainerStyle={{
          paddingHorizontal:15
        }}>
          {/* {
            categories.map((category, index)=>{
              let isActive = category.id==activeCategory;
              let btnClass = isActive? ' bg-gray-600' : 'bg-gray-200';
              let textClass = isActive? ' font-semibold text-gray-600' : 'text-gray-200';
              return (
                <View key={index} className=' flex justify-center items-center mr-6'>
                  <TouchableOpacity
                    onPress={()=> setActiveCategory()}
                    className={' p-1 rounded-full shadow bg-gray-200'+btnClass}> */}
                      {/* <Image style={{width:45, height: 45}} /> */}
                  {/* </TouchableOpacity>
                    <Text className={' text-sm'+textClass}></Text>
                </View>
              )
            })
          } */}

      </ScrollView>
    </View>
  )
}
