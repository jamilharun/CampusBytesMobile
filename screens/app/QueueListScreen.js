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
  const [readyIndex, getReadyIndex] = useState(null)
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
      // console.log(readyId, readyIndex);
      if (readyId || readyIndex) {
        console.log(readyId, readyIndex);
        const result = await finishOrder(readyId, readyIndex)
        console.log(result);
      }
    } catch (error) {
      console.log('somethings wrong');
    }
  }

  // const handleVerification = (data) => {

  // }
  
  return (
    <View >
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
        <Text className='mx-3 my-2'>note: please double check the reference Id. on your Gcash account. to see if the user DID pay the right totalamount on the checkout </Text>
        <View className='flex flex-row mb-4'>
          <Text className='w-1/2 text-center text-xl font-bold'>Queue no.</Text>
          <Text className='w-1/2 text-center text-xl font-bold'>order info</Text>
        </View>
        <ScrollView>
          {/* if priority order exist */}

          {
            ysq && yscheckout ?
              ysq.map((data,  index)=>
                
              yscheckout[`${data}`] ? (
                  <View className='mb-20 rounded-3xl shadow-2xl bg-white mx-3 ' key={data}   >
                    {
                      yscheckout[`${data}`] && yscheckout[`${data}`].checkout ? (
                        yscheckout[`${data}`]?.checkout?.isspecial == true ? (
                          <TouchableOpacity onPress={()=>{
                            setOpenModal(true)
                            getReadyId(data)
                            getReadyIndex(index)}}
                            className='flex flex-row justify-between items-center mt-4 mx-3 mb-2'>
                             <Text className='text-2xl pb-3'>Priority:</Text>
                             <AntDesign name="checkcircleo" size={25} color="green"/>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity 
                            onPress={()=>{
                              setOpenModal(true)
                              getReadyId(data)
                              getReadyIndex(index)}}
                            className='flex flex-row justify-end mt-4 mx-3 mb-2'>
                            <AntDesign name="checkcircleo" size={25} color="green"/>
                          </TouchableOpacity>
                        )
                      ) : null
                    }
                    <View className='flex flex-row items-center'>
                    {
                        yscheckout[`${data}`] && yscheckout[`${data}`].checkout ? (
                          yscheckout[`${data}`]?.checkout?.isspecial == true ? (
                            <View className='w-1/4 mx-10 h-40 bg-EacColor-SelectiveYellow flex justify-center rounded-xl '>
                              <Text className=' text-4xl text-center rounded-full font-bold'>{index + 1}</Text>
                            </View>
                          ) : (
                            <View className='w-1/4 mx-10'>
                              <Text className=' text-2xl text-center rounded-full'>{index + 1}</Text>
                            </View>      
                          )
                       ) : null
                    } 
                       <View className='w-1/2'>
                     {
                       yscheckout[`${data}`] && yscheckout[`${data}`].buyerDetails ?
                       <Text className='text-2xl font-semibold'>{yscheckout[`${data}`].buyerDetails?.name}</Text>
                       :
                       <Text>no data</Text>
                     }
                     {/* {
                       allorder[`${data}`].buyerDetails ? 
                       <Text className='text-xl overflow-hidden'>{allorder[`${data}`].buyerDetails.name}</Text>
                       : <Text className='text-xl overflow-hidden'>loading...</Text>
                     } */}
                     <View className='flex flex-row'>
                      <Text className='text-xl overflow-hidden'>orderID: </Text>
                      <Text className='text-xl font-black overflow-hidden'>{data}</Text>
                     </View>
                     {
                       // if location exist then buyyer expect food to be delivered on that location
                       yscheckout[`${data}`] && yscheckout[`${data}`].checkout ? (
                         yscheckout[`${data}`]?.checkout?.location == "" ? (
                           <Text className='text-xl overflow-hidden'>Location: none</Text>
                         ) : (
                            <View >
                              <Text className='text-xl overflow-hidden'>Location: </Text>
                              <Text className='text-xl font-black'>{yscheckout[`${data}`]?.checkout?.location}</Text>
                            </View>
                         )
                       ) : <Text className='text-xl overflow-hidden'>no data</Text>
                     }
                     <Text className='text-xl overflow-hidden'>Ref no: </Text>
                     <Text className='text-xl font-bold'>{yscheckout[`${data}`]?.checkout.paymentref}</Text>
                    </View>
                  </View>
                    <View className='mx-4'>
                      <Text className='mt-3 text-xl font-bold '>Order Items:</Text>
                      {
                        yscheckout[`${data}`].items.map((item, index) => {
                          let itemjson = JSON.parse(item)  
                          let cartjson = JSON.parse(yscheckout[`${data}`]?.cartstring)
                  
                          return <View key={itemjson._id}>
                            <Text className='font-bold text-lg'>{index + 1}.</Text>
                            <Text>item name: <Text className='font-bold text-lg'>{itemjson.dishName ? itemjson.dishName : itemjson.productName}</Text> </Text> 
                            <Text>Price: <Text className='font-bold text-lg'>{itemjson.price ? itemjson.price : itemjson.Price}</Text></Text>                    
                            <Text>Type: <Text className='font-bold text-lg'>{itemjson._type}</Text> </Text>
                            {
                              cartjson ? (
                                cartjson[index].itemref == itemjson._id ? (
                                  <View>
                                    <Text>Quantity: <Text className='font-bold text-lg'>{cartjson[index].quantity}</Text> </Text>
                                    <Text>Sub-total: <Text className='font-bold text-lg'>{cartjson[index].subtotalprice}</Text> </Text>
                                  </View>
                                ) : null
                              ) : null
                            }
                          </View>      
                        })
                      }
                      
                    </View>
                    <View className='mx-4 pb-5'>
                      <Text className='mt-3 text-xl font-bold '>Order Meta data</Text>
                      <View>
                          <Text>Location: <Text className='font-bold text-lg'>{yscheckout[`${data}`]?.checkout.location}</Text> </Text>
                          <Text>picked up: <Text className='font-bold text-lg'>{yscheckout[`${data}`]?.checkout.isfinished ? 'true' : 'false'}</Text> </Text>
                          <Text>Priority: <Text className='font-bold text-lg'>{yscheckout[`${data}`]?.checkout.isspecial ? 'true' : 'false'}</Text> </Text>
                          <Text>ordered_at: <Text className='font-bold text-lg'>{yscheckout[`${data}`]?.checkout.created_at}</Text> </Text>
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
                  <Text>are you sure the orderid "{readyId}", index "{readyIndex}" is finished?</Text>
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
                        getReadyIndex(null)
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