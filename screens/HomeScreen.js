
import { StatusBar } from 'expo-status-bar'
import React, { useContext } from 'react'
import { View, Text, TextInput, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Categories from '../components/categories';
import FeaturedRow from '../components/featuredRow';
import { Map, Search, Sliders } from 'react-native-feather';
import { AuthContext } from '../context/AuthContext';

// sample user data | remove this after testing
// import { user } from '../constants/sampleuser';
export default function HomeScreen() {

  // auth0 line of code!!!
  const { user } = useContext(AuthContext)
  
  if (!user) {
    alert("no data found")
  }
  return (
    <SafeAreaView className='bg-white'>
      <StatusBar barStyle='dark-Content' />
      <View className='flex-row items-center space-x-2 px-4 pb-2'>
        
        <View className='flex-row flex-1 items-center p-3 rounded-full border border-gray-300'>
          <Search height='25' width='25' className=' text-gray-600'/>
          <TextInput placeholder='Restaurants' className='ml-2 flex-1'/>
          <View className='flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-gray-300'>
            <Map height='20' width='20'/>
            <Text className=' text-gray-600'>Eac, Cavite</Text>
          </View>
        </View>
        <View className=' bg-EacColor-TahitiGold p-3 rounded-full'>
          <Sliders height='20' width='20' strokeWidth={2.5} stroke='white'/>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20
        }}/>

        {/* categories */}  
        <Categories/>

        {/* featured */}
        <View className=" mt-5">
          
          
          <Text>user_id:{user?.user_id}</Text>
          <Text>name:{user?.name}</Text>
          <Text>nickname:{user?.nickname}</Text>
          <Text>email:{user?.email}</Text>
          <Image source={user?.picture} className="w-20 h-20 rounded-full" />
          
          {/* {
            [ featured, featured, featured].map((item, index)=>{
              <FeaturedRow
                key={index}
                title={item.title}
                restaurant={item.restaurant}
                description={item.description}/>
            })
          } */}
        </View>
    </SafeAreaView>
  )
}
