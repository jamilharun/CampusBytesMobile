import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query';
import { qfs1df, qfsdf } from '../../utils/query';
import { AuthContext } from '../../context/AuthContext';
import { sanityFetch, urlFor } from '../../apis/sanity';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Menu} from "react-native-feather";
import { Feather, AntDesign, FontAwesome, Entypo   } from '@expo/vector-icons';

export default function YourShop() {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [data, setData] = useState(null)
    const [err, setErr] = useState(null);

    const fetchingData = async () => {
      try {
        const data = await sanityFetch(qfs1df('Michael Rodriguez'))
        console.log('Success feyching');
        return data;      
        
      } catch (error) {
        console.log('Error feyching', error);
      }
    };

    const { data: sdp, isLoading, error, isFetching} = useQuery({ 
        queryKey: [`shopData`], 
        queryFn: fetchingData,
        gcTime: 10000,
    });
      
    console.log({isLoading, isFetching, error, sdp});
    
    if (isLoading) {
      return (
        <View className='w-full h-64 flex justify-center items-center'>
          <Text className='text-2xl'>Loading...</Text>
        </View>
      )
    }

    if (error) {
      setErr(`YourShop page: ${error}`)
    }

    if (sdp) {
      //single data
      setData(sdp[0])
      console.log('Success');
    }

  return (
    <SafeAreaView>
      <TouchableOpacity 
                onPress={()=>{
                  navigation.dispatch(DrawerActions.openDrawer())
                }}
                className="TahitiGold p-3 rounded-full">
                  <Menu 
                    height="20" 
                    width="20" 
                    strokeWidth={2.5} 
                    className="text-EacColor-TahitiGold"/>
        </TouchableOpacity>
        <ScrollView>

          {
            data.cover && (
              <Image 
                  className='h-32 w-full object-cover rounded-xl mt-1' 
                  source={{ uri: urlFor(data?.cover).url()}}/>
            )
          }
        <View className='bg-gray-300 w-full h-56'>
        </View>
        <View className='flex flex-col justify-center items-center'>
          <View className='flex flex-row justify-between w-full'>
            <View className='flex flex-col justify-center items-center w-1/3'>
              <Feather name="info" size={44} color="green" />
              <Text className='text-2xl font-normal'>Pending</Text>
              <Text className='text-2xl font-medium'>5</Text>
            </View>
            <View className='flex flex-col justify-center items-center w-1/3'>
              <AntDesign name="checkcircleo" size={44} color="green" />
              <Text className='text-2xl font-normal'>Completed</Text>
              <Text className='text-2xl font-medium'>10</Text>
            </View>
            <View className='flex flex-col justify-center items-center w-1/3'>
              <FontAwesome name="money" size={44} color="green" />
              <Text className='text-2xl font-normal'>Earning</Text>
              <Text className='text-2xl font-medium'>100.00₱</Text>
            </View>
          </View>
        </View>
          <View className=' '>
            <View className='flex flex-row justify-between w-full h-60'>
              <TouchableOpacity
                onPress={() => {navigation.navigate("addGoods", {data})}}
                className="flex flex-col justify-center items-center w-1/2"
              >
                <AntDesign name="pluscircleo" size={44} color="green" />
                <Text className='text-2xl font-normal'>Add Menu</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => {navigation.navigate("QueueList", {data})}}
                className="flex flex-col justify-center items-center w-1/2"
              >
                <Entypo name="list" size={44} color="green" />
                <Text className='text-2xl font-normal'>Queue List</Text>
              </TouchableOpacity>
            </View>
            <View className='flex flex-row justify-between w-full h-60'>

              <TouchableOpacity
                onPress={() => {navigation.navigate("viewGoods", {data})}}
                className="flex flex-col justify-center items-center w-1/2"
              >
                <AntDesign name="eyeo" size={44} color="green" />
                <Text className='text-2xl font-normal'>View Menu</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {navigation.navigate("editGoods", {data})}}
                className="flex flex-col justify-center items-center w-1/2"
              >
                <AntDesign name="edit" size={44} color="green" />
                <Text className='text-2xl font-normal'>Edit Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="pb-5"></View>
        </ScrollView>
        
    </SafeAreaView>
  )
}