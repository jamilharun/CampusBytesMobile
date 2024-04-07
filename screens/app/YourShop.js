import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query';
import { qfs1df, qfsdf } from '../../utils/query';
import { AuthContext } from '../../context/AuthContext';
import {  urlFor } from '../../apis/sanity';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Menu} from "react-native-feather";
import { Feather, AntDesign, FontAwesome, Entypo   } from '@expo/vector-icons';
import { predefineshopData } from '../../constants/predefineData';
import { fetchShopById, fetchShopQueue } from '../../apis/server';

export default function YourShop() {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const [err, setErr] = useState(null);

    const userData = user ? user : {
      email: 'TestUser@email.com',
      family_name: "ForDubbing",
      given_name: "User123",
      nickname: "sample user",
      name: 'user123',
      picture: "https://i.ytimg.com/vi/BEZmXjh8l0M/hq720_2.jpg?sqp=-oaymwEYCIACEOADSFryq4qpAwoIARUAAIhC0AEB&rs=AOn4CLDg2TpFauEmoM4VAD2gaMR_nJwSTQ",
      sub: "google-oauth2|103360425900701922708",
      "https://myroles.com/roles": ["shopOwner", "Special", "Admin", "Client"]
    }

    const { data: ysd, isLoading, error, isFetching} = useQuery({ 
      queryKey: [`yourShop`], 
      queryFn: () => fetchShopById(userData.sub),
      gcTime: 10000,
      keepPreviousData: true,
      // refetchInterval: 10000,
      refetchOnWindowFocus: true
    }); 

    console.log('you shop: ', ysd);
    // gcTime: 12 * 60 * 60 * 1000,
    // staleTime: 24 * 60 * 60 * 1000,
    // refetchInterval: 12 * 60 * 60 * 1000,
    // keepPreviousData: true, 
    // refetchOnWindowFocus: true,
    // retry: (failureCount, error) => {
    //   // Define your retry logic here
    //   if (failureCount < 3) { // Retry only twice (including the initial attempt)
    //     return true; // Retry on the next error
    //   }
    //   return false; // Don't retry after the second attempt
    // },
    
    console.log('you shop: ', ysd);
    
    const { data: ysq} = useQuery ({ 
      queryKey: [`yourShopQueue`], 
      queryFn: () => fetchShopQueue(ysd[0]._id),
      gcTime: 2 * 60 * 1000,
      keepPreviousData: true,
      refetchInterval:  60 * 1000,
      refetchOnWindowFocus: true
    });
    console.log('your shop queues', ysq);
    // console.log('yourShopData', yourShopData);
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
            ysd && ysd[0]?.cover ? (
              <Image 
                  className='h-32 w-full object-cover rounded-xl mt-1' 
                  source={{ uri: urlFor(ysd[0]?.cover).url()}}/>
            ) : null
          }
          <View className='pt-5 px-5'>
            <Text className='text-xl  font-bold '>Your Shop</Text>
            <View>
              {
                ysd && ysd[0]?.shopName ? (
                  <Text className='text-2xl  font-bold '>{ysd[0]?.shopName}</Text>
                ) : (<Text className='text-2xl  font-bold '>Loading name</Text>)
              }
            </View>
          </View>
        <View className='flex mt-3 flex-col justify-center items-center'>
          <View className='flex flex-col justify-between w-full px-5'>
            <View className='flex flex-row items-center'>
              <Feather name="info" size={25} color="green" />
              <Text className='text-2xl font-normal pl-2'>Queues: </Text>
              {
                ysq ? (
                  <Text className='text-2xl font-medium'>{ysq?.length}</Text>
                ) : (<Text className='text-xl font-medium'>loading</Text>)
              }
            </View>
            <View className='flex flex-row items-center '>
              <AntDesign name="checkcircleo" size={25} color="green"/>
              <Text className='text-2xl font-normal pl-2'>Finished:</Text>
              <Text className='text-2xl font-medium'>10</Text>
            </View>
            <View className='flex flex-row '> 
              <FontAwesome name="money" size={25} color="green" />
              <Text className='text-2xl font-normal pl-2'>Earnings:</Text>
              <Text className='text-2xl font-medium'>₱100.00</Text>
            </View>
          </View> 
        </View>
          <View className=' '>
            <View className='flex flex-row justify-between w-full h-60'>

              <TouchableOpacity
                onPress={() => {navigation.navigate("ViewMenu", {ysd})}}
                className="flex flex-col justify-center items-center w-1/2"
              >
                <AntDesign name="eyeo" size={44} color="green" />
                <Text className='text-2xl font-normal'>View Menu</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => {navigation.navigate("QueueList", {ysd})}}
                className="flex flex-col justify-center items-center w-1/2"
              >
                <Entypo name="list" size={44} color="green" />
                <Text className='text-2xl font-normal'>Queue List</Text>
              </TouchableOpacity>
            </View>
            <View className='flex flex-row justify-between w-full h-60'>
            </View>
          </View>
          <View className="pb-5"></View>
        </ScrollView>
    </SafeAreaView>
  )
}