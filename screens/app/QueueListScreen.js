import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronLeft, MapPin } from 'react-native-feather';

export default function QueueListScreen() {
  return (
    <View>
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
                queue list
            </Text>
        </View>
        <ScrollView>
          <TouchableOpacity 
            onPress={()=>{}}
            className='pb-3 flex flex-row items-center overflow-hidden  '>
            <Text className='mx-6 w-7 text-2xl text-center text-white bg-EacColor-DeepFir rounded-full'>1</Text>
            <View>
              <Text className='px-6 text-xl overflow-hidden'>Name123</Text>
              <Text className='px-6 text-xl overflow-hidden'>orderID: 123123</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=>{}}
            className='pb-3 flex flex-row items-center overflow-hidden '>
            <Text className='mx-6 w-7 text-2xl text-center text-white bg-EacColor-TahitiGold rounded-full'>1</Text>
            <View>
              <Text className='px-6 text-xl overflow-hidden'>Name123</Text>
              <Text className='px-6 text-xl overflow-hidden'>orderID: 123123</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
    </View>
  )
}