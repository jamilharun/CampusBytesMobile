import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, MapPin } from 'react-native-feather';
import { fetchAllCheckout, fetchShopQueue, finishOrder, getAllShopQueue, getMyShopQueue } from '../../apis/server';
import { Feather, AntDesign, FontAwesome, Entypo   } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';

export default function QueueListScreen({route, navigation}) {
  const {ysd} = route.params;
  const [openModal, setOpenModal] = useState(false)
  const [readyId, getReadyId] = useState(null)

  // const [allorder, getAllOrder] = useState(null)
  //your shop queue
  const { data: ysq, isLoading, error, isFetching} = useQuery ({ 
    queryKey: [`yourShopQueue`], 
    queryFn: () => fetchShopQueue(ysd[0]._id),
    gcTime: 2 * 60 * 1000,
    keepPreviousData: true,
    refetchInterval:  60 * 1000,
    refetchOnWindowFocus: true
  });
  console.log('QUEUUE LIST SCREEN: QUEUE'.ysq);

  const { data: yscheckout} = useQuery ({ 
    queryKey: [`yourShopCheckout`], 
    queryFn: () => fetchAllCheckout(ysd[0]._id),
    gcTime: 10000,
    keepPreviousData: true,
    // refetchInterval: 10000,
    refetchOnWindowFocus: true
  });
  console.log('checkout: ', yscheckout);

  const handleFinishOrder = async () => {
    console.log(' this is finished');
    try {
      if (readyId) {
        console.log(readyId);
        const result = await finishOrder(readyId)
        console.log(result);
      }
    } catch (error) {
      console.log('somethings wrong');
    }
  }

  // const handleVerification = (data) => {

  // }
  
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
            ysq && yscheckout ?
              ysq.map((data, index)=>
                
              yscheckout[`${data}`] ? (
                  <View key={data} className='py-4 px-4'>
                    {
                      yscheckout[`${data}`] && yscheckout[`${data}`].checkout ? (
                        yscheckout[`${data}`]?.checkout?.isspecial == true ? (
                          <TouchableOpacity onPress={()=>{
                            setOpenModal(true)
                            getReadyId(data)}}
                            className='flex flex-row justify-between items-center'>
                             <Text className='text-2xl pb-3'>Priority:</Text>
                             <AntDesign name="checkcircleo" size={25} color="green"/>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity 
                            onPress={()=>{
                              setOpenModal(true)
                              getReadyId(data)}}
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
                        yscheckout[`${data}`].items.map((item, index) => {
                          let itemjson = JSON.parse(item)  
                          let cartjson = JSON.parse(yscheckout[`${data}`]?.cartstring)
                  
                          return <View key={itemjson._id}>
                            <Text>item name: {itemjson.dishName ? itemjson.dishName : itemjson.productName}</Text> 
                            <Text>Price: {itemjson.price ? itemjson.price : itemjson.Price}</Text>                    
                            <Text>Type: {itemjson._type}</Text>
                            {
                              cartjson ? (
                                cartjson[index].itemref == itemjson._id ? (
                                  <View>
                                    <Text>Quantity: {cartjson[index].quantity}</Text>
                                    <Text>Sub-total: {cartjson[index].subtotalprice}</Text>
                                  </View>
                                ) : null
                              ) : null
                            }
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
        
        <Modal
              visible={openModal}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setOpenModal(false)}>
              <View
                style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                activeOpacity={1}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                  {/* Your filter content goes here */}
                  {/* <View className='flex flex-row justify-between items-center'>
                    <Text>Filter Option</Text>
                    <AntDesign name="close" size={24} color="black" onPress={() => setOpenFilter(false)} />
                  </View> */}
                  <Text>Are you sure? </Text>
                  {/* <TextInput
                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, paddingLeft: 10, paddingVertical: 8, marginBottom: 10 }}
                    value={filterAmount ? filterAmount.toString() : ''} // Check if filterAmount is defined
                    onChangeText={setFilterAmount}
                    keyboardType="numeric"
                    placeholder="Enter amount"
                  /> */}
                  <Text>are you sure the orderid "{readyId}" is finished?</Text>
                  <View>
                    <TouchableOpacity 
                      style={{ backgroundColor: '#FFD700', marginTop: 10, padding: 10, borderRadius: 5 }}
                      onPress={() => {
                        setOpenModal(false);
                        handleFinishOrder()
                      }}>
                      <Text style={{ textAlign: 'center' }}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className='mt-5 p-3 rounded-lg bg-gray-500'
                      onPress={() => {
                        setOpenModal(false);
                        getReadyId(null)
                      }}>
                    <Text style={{ textAlign: 'center' }}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
    </View>
  )
}