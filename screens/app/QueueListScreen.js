import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, MapPin } from 'react-native-feather';
import { fetchAllCheckout, fetchShopQueue, getAllShopQueue, getMyShopQueue } from '../../apis/server';
import { Feather, AntDesign, FontAwesome, Entypo   } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';

export default function QueueListScreen({route, navigation}) {
  const {ysd} = route.params;

  const [allorder, getAllOrder] = useState(null)
  //your shop queue
  const { data: ysq, isLoading, error, isFetching} = useQuery ({ 
    queryKey: [`yourShopQueue`], 
    queryFn: () => fetchShopQueue(ysd[0]._id),
    gcTime: 10000,
    keepPreviousData: true,
    // refetchInterval: 10000,
    refetchOnWindowFocus: true
  });
  console.log(ysq);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetchAllCheckout(ysd[0]._id)
  //     getAllOrder(response)
  //   };
  //   fetchData()
  // },[]); // Empty dependency array ensures effect runs only once after mount
  
  const { data: yscheckout} = useQuery ({ 
    queryKey: [`yourShopCheckout`], 
    queryFn: () => fetchAllCheckout(ysd[0]._id),
    gcTime: 10000,
    keepPreviousData: true,
    // refetchInterval: 10000,
    refetchOnWindowFocus: true
  });
  // console.log('checkout: ', yscheckout);

  const handleFinishOrder = () => {
    
  }
  
  return (
    <View>
      <View className="w-full mt-4 flex flex-row justify-between items-center bg-white pr-4 shadow-sm">
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
        
        <View className='flex flex-row mb-4'>
          <Text className='w-1/2 text-center text-xl font-bold'>Queue no.</Text>
          <Text className='w-1/2 text-center text-xl font-bold'>order info</Text>
        </View>
        <ScrollView>
          {/* if priority order exist */}

          {
            ysq ? 
              ysq.map((data, index)=>
                yscheckout[`${data}`] ? (
                  <View key={data} className='py-4 px-4'>
                    {
                      yscheckout[`${data}`] && yscheckout[`${data}`].checkout ? (
                        yscheckout[`${data}`]?.checkout?.isspecial == true ? (
                          <TouchableOpacity className='flex flex-row justify-between items-center'>
                             <Text className='text-2xl pb-3'>Priority:</Text>
                             <AntDesign name="checkcircleo" size={25} color="green"/>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity 
                            // onPress={()=>{handleFinishOrder()}}
                            className='flex flex-row justify-end '>
                            <AntDesign name="checkcircleo" size={25} color="green"/>
                          </TouchableOpacity>
                        )
                      ) : null
                    }
                    <View className='flex flex-row items-center'>
                    {
                        yscheckout[`${data}`] && yscheckout[`${data}`].checkout ? (
                          yscheckout[`${data}`]?.checkout?.isspecial == true ? (
                            <View className='w-1/2 h-40 bg-EacColor-SelectiveYellow flex justify-center rounded-xl '>
                              <Text className=' text-2xl text-center rounded-full'>{index}</Text>
                            </View>
                          ) : (
                            <View className='w-1/2'>
                              <Text className=' text-2xl text-center rounded-full'>{index}</Text>
                            </View>      
                          )
                       ) : null
                    } 
                       <View className='w-1/2'>
                     {
                       //debugging
                       // console.log('checkout data', yscheckout[`${data}`])
                       yscheckout[`${data}`] && yscheckout[`${data}`].buyerDetails ?
                       <Text className='text-xl'>{yscheckout[`${data}`].buyerDetails?.name}</Text>
                       :
                       <Text>no data</Text>
                     }
                     {/* {
                       allorder[`${data}`].buyerDetails ? 
                       <Text className='text-xl overflow-hidden'>{allorder[`${data}`].buyerDetails.name}</Text>
                       : <Text className='text-xl overflow-hidden'>loading...</Text>
                     } */}
                     <Text className='text-xl overflow-hidden'>orderID: {data}</Text>
                     {
                       // if location exist then buyyer expect food to be delivered on that location
                       yscheckout[`${data}`] && yscheckout[`${data}`].checkout ? (
                         yscheckout[`${data}`]?.checkout?.location == "" ? (
                           <Text className='text-xl overflow-hidden'>Location: none</Text>
                         ) : (
                           <Text className='text-xl overflow-hidden'>Location: {yscheckout[`${data}`]?.checkout?.location}</Text>
                         )
                       ) : <Text className='text-xl overflow-hidden'>no data</Text>
                     }
                      </View>
                    </View>
                    <View>
                      <Text className='mt-3 text-xl '>Order Items:</Text>
                      {
                        yscheckout[`${data}`].items.map(item => {
                          let itemjson = JSON.parse(item)  
                          return <View>
                            <Text>item name: {itemjson.dishName ? itemjson.dishName : itemjson.productName}</Text> 
                            <Text>Price: {itemjson.price ? itemjson.price : itemjson.Price}</Text>                    
                            <Text>Type: {itemjson._type}</Text>
                          </View>      
                        })
                      }
                      
                    </View>
                    <View>
                      <Text className='mt-3 text-xl'>Order Meta data</Text>
                      

                      <View>
                          <Text>Shop id: {yscheckout[`${data}`].checkout.shopref}</Text>
                          <Text>user id: {yscheckout[`${data}`].checkout.userref}</Text>
                          <Text>payment id: {yscheckout[`${data}`]?.checkout.paymentid}</Text>
                          <Text>Location: {yscheckout[`${data}`]?.checkout.location}</Text>
                          <Text>payment success: {yscheckout[`${data}`]?.checkout.paysuccess ? 'true' : 'false'}</Text>
                          <Text>picked up: {yscheckout[`${data}`]?.checkout.isfinished ? 'true' : 'false'}</Text>
                          <Text>Priority: {yscheckout[`${data}`]?.checkout.isspecial ? 'true' : 'false'}</Text>
                          <Text>ordered_at: {yscheckout[`${data}`]?.checkout.created_at}</Text>
                      </View>
                    </View>
                  </View>
                ) : null
            ) : null
          }

          <View className='h-52'></View>
        </ScrollView>
    </View>
  )
}