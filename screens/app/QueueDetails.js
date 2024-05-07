import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ChevronLeft } from 'react-native-feather';
import { useQuery } from '@tanstack/react-query';
import { fetchCheckout, removePickup, viewPickup } from '../../apis/server';
import { AuthContext } from '../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
export default function QueueDetails({route, navigation}) {
  const {userQueue, userPickup} = route.params;
  console.log('queue detail userPickup ',userPickup);
  console.log('queue detail userQueue ',userQueue);
  // console.log(route.params);  
  const { user } = useContext(AuthContext);
  // const [userCheckOut, setUserCheckOut] = useState()
  const [handleId, getHandleId] = useState(null)  
  const [openModal, setOpenModal] = useState(false)
  // const [userPickup, setUserPickup] = useState(null)
    
  const userData = user ? user : {
    email: 'TestUser@email.com',
    family_name: "ForDubbing",
    given_name: "User123",
    nickname: "sample user",
    name: 'user123',
    picture: "https://i.ytimg.com/vi/BEZmXjh8l0M/hq720_2.jpg?sqp=-oaymwEYCIACEOADSFryq4qpAwoIARUAAIhC0AEB&rs=AOn4CLDg2TpFauEmoM4VAD2gaMR_nJwSTQ",
    sub: "user.sub",
    "https://myroles.com/roles": ["shopOwner", "Special", "Admin", "Client"]
  }


  const isFocused = useIsFocused();
  // ... rest of your component logic
  const { data: userCheckout } = useQuery({
    queryKey: [`userCheckout`],
    queryFn: () => fetchCheckout(userData.sub),
    refetchOnWindowFocus: isFocused, // Only refetch when focused
    keepPreviousData: true,
    refetchInterval: 1000000,
    refetchOnWindowFocus: true
  
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchPickup = await viewPickup(userData.sub)  ///order/user/pickup/:id
  //     console.log('header pickup: ', fetchPickup);
  //     setUserPickup(fetchPickup);
  //   };
  //   fetchData()
  // }, []); 
  // console.log('pick me up', userPickup);

  const alreadyPickupOrder = async () => {
    console.log('item already picked up');
    try {
      if (handleId) {
        const result  = await removePickup(handleId)
        console.log('alreadyPickupOrder result: ', result);
      }
    } catch (error) {
      console.log('somethings wrong');
    }
  }

  return (
    <View>
      <View className=' relative py-4 pt-7 shadow-sm'>
        <View className=''>
                <TouchableOpacity 
                    onPress={()=>{navigation.goBack()}}
                    className="TahitiGold pl-3 rounded-full absolute z-50">
                    <ChevronLeft
                    className="text-EacColor-BlackPearl"
                    style={{ width: 28, height: 28 }}/>
                </TouchableOpacity>
                <Text className=' text-center font-bold text-xl'>Queue Details</Text>
                {/* <Text className=' text-center text-gray-500'>{shop.name   }</Text> */}
            </View>
        </View>
        
        <ScrollView>
        {
          userPickup &&
          userPickup.length > 0 ? <View className='px-4 py-4 '>
            <Text className='text-xl '>Your Order is Ready to pickup!</Text>
            <Text className=''>click the green to confirm checkout</Text>
          </View> : null
        }

        {
          userCheckout &&
            userPickup?.map((pickup, index)=>
            pickup ? (
              <View className='mb-20 rounded-3xl shadow-2xl bg-white mx-3 ' key={index}>
                
                <TouchableOpacity className='bg-limeGreen rounded-t-3xl pt-3' onPress={()=>{
                  setOpenModal(true)
                  getHandleId(pickup.data)}}>
                  {
                    userCheckout[`${pickup.data}`]?.checkout.isfinished ? (
                      <View 
                        className='flex flex-row justify-between items-center'>
                        <Text className='text-3xl w-full text-center'>{pickup.data}</Text>    
                      </View>
                    ) : null
                  }
                  <View className='flex flex-row justify-between items-center'>
                    <Text className='text-xl w-full text-center'>orderid</Text>
                  </View>
                </TouchableOpacity>
                <Text className='mt-3 text-xl font-bold px-4'>Order information</Text>
              <View className='px-4'>
                  <Text className='text-lg'>total Amount: {userCheckout[`${pickup.data}`]?.checkout.totalamount}</Text>
                  <Text className='text-lg'>Delivery fee: {userCheckout[`${pickup.data}`]?.checkout.deliveryfee}</Text>
                  <Text className='text-lg'>Service fee: {userCheckout[`${pickup.data}`]?.checkout.servicetax}</Text>
                  <Text className='text-lg'>payment ref: {userCheckout[`${pickup.data}`]?.checkout.paymentref}</Text>
                  <Text className='text-lg'>Location: {userCheckout[`${pickup.data}`]?.checkout.location}</Text>
                  <Text className='text-lg'>picked up: {userCheckout[`${pickup.data}`]?.checkout.isfinished ? 'true' : 'false'}</Text>
                  <Text className='text-lg'>Priority: {userCheckout[`${pickup.data}`]?.checkout.isspecial ? 'true' : 'false'}</Text>
                  <Text className='text-lg'>ordered_at: {userCheckout[`${pickup.data}`]?.checkout.created_at}</Text>
              </View>
              
              <Text className='mt-3 text-xl font-bold px-4'>Order Items</Text>
              {
                userCheckout[`${pickup.data}`]?.items.map((item, index) => {
                  let itemjson = JSON.parse(item)
                  let cartjson = JSON.parse(userCheckout[`${pickup.data}`]?.cartstring)
                  console.log(cartjson[index].cartid);
                  return <View className='px-4' key={index}>
              
                    <View>
                      <Text className='text-lg'>item name: {itemjson.dishName ? itemjson.dishName : itemjson.productName}</Text> 
                      <Text className='text-lg'>Type: {itemjson._type}</Text>
                      <Text className='text-lg'>Price: {itemjson.price ? itemjson.price : itemjson.Price}</Text>                    
                      {
                        cartjson ? (
                          cartjson[index].itemref == itemjson._id ? (
                            <View>
                              <Text className='text-lg'>Quantity: {cartjson[index].quantity}</Text>
                              <Text className='text-lg'>Sub-total: {cartjson[index].subtotalprice}</Text>
  
                            </View>
                          ) : null
                        ) : null
                      }
                    </View>
                  </View>
                })
              }
              
              <Text className='mt-3 text-xl font-bold px-4'>Shop Details</Text>
              {pickup.data ? (
                userCheckout[`${pickup.data}`]?.shopDetails && (
                  <View className='px-4'>
                    {(() => {
                      const shopjson = JSON.parse(userCheckout[`${pickup.data}`].shopDetails);
                      return (
                        <React.Fragment>
                          <Text className='text-lg'>shop name: {shopjson.shopName}</Text>
                          {/* <Text>description: {shopjson.description}</Text> */}
                          <Text className='text-lg'>address: {shopjson.address}</Text>
                        </React.Fragment>
                      );
                    })()}
                  </View>
                )
              ) : null}
              </View>
            ) : null)
        }

{/* 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 */}

        {
        userCheckout &&
          userQueue.map((queue, index)=>
            queue ? (
            <View className='mb-20 rounded-3xl shadow-2xl bg-white mx-3 ' key={index}>
              <View className='bg-babyBlue rounded-t-3xl pt-3'>
                {
                  userCheckout[`${queue.data}`]?.checkout.isfinished ? (
                    <TouchableOpacity className='flex flex-row justify-between items-center'>
                      <Text className='text-3xl w-1/2 text-center'>{queue.index}</Text>
                      <Text className='text-3xl w-1/2 text-center'>{queue.data}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View className='flex flex-row justify-between items-center'>
                      <Text className='text-3xl w-1/2 text-center'>{queue.index}</Text>
                      <Text className='text-3xl w-1/2 text-center'>{queue.data}</Text>
                    </View>
                  )
                }
                <View className='flex flex-row justify-between items-center'>
                  <Text className='text-xl w-1/2 text-center'>queue</Text>
                  <Text className='text-xl w-1/2 text-center'>orderid</Text>
                </View>

              </View>
              <Text className='mt-3 text-xl font-bold px-4'>Order information</Text>
              <View className='px-4'>
                  <Text className='text-lg'>total Amount: {userCheckout[`${queue.data}`]?.checkout.totalamount}</Text>
                  <Text className='text-lg'>Delivery fee: {userCheckout[`${queue.data}`]?.checkout.deliveryfee}</Text>
                  <Text className='text-lg'>Service fee: {userCheckout[`${queue.data}`]?.checkout.servicetax}</Text>
                  <Text className='text-lg'>payment ref: {userCheckout[`${queue.data}`]?.checkout.paymentref}</Text>
                  <Text className='text-lg'>Location: {userCheckout[`${queue.data}`]?.checkout.location}</Text>
                  <Text className='text-lg'>picked up: {userCheckout[`${queue.data}`]?.checkout.isfinished ? 'true' : 'false'}</Text>
                  <Text className='text-lg'>Priority: {userCheckout[`${queue.data}`]?.checkout.isspecial ? 'true' : 'false'}</Text>
                  <Text className='text-lg'>ordered_at: {userCheckout[`${queue.data}`]?.checkout.created_at}</Text>
              </View>
              
              <Text className='mt-3 text-xl font-bold px-4'>Order Items</Text>
              {
                userCheckout[`${queue.data}`]?.items.map((item, index) => {
                  let itemjson = JSON.parse(item)
                  // let shopjson = JSON.parse(userCheckout[`${queue.data}`]?.shopDetails)
                  // console.log(userCheckout[`${queue.data}`]?.cartstring);
                  let cartjson = JSON.parse(userCheckout[`${queue.data}`]?.cartstring)
                  console.log(cartjson[index].cartid);
                  return <View className='px-4' key={index}>
              
                    <View>
                      <Text className='text-lg'>item name: {itemjson.dishName ? itemjson.dishName : itemjson.productName}</Text> 
                      <Text className='text-lg'>Type: {itemjson._type}</Text>
                      <Text className='text-lg'>Price: {itemjson.price ? itemjson.price : itemjson.Price}</Text>                    
                      {
                        cartjson ? (
                          cartjson[index].itemref == itemjson._id ? (
                            <View >
                              <Text className='text-lg'>Quantity: {cartjson[index].quantity}</Text>
                              <Text className='text-lg'>Sub-total: {cartjson[index].subtotalprice}</Text>
  
                            </View>
                          ) : null
                        ) : null
                      }
                    </View>
                  </View>
                })
              }
              
              <Text className='mt-3 text-xl font-bold px-4'>Shop Details</Text>
              {queue.data ? (
                userCheckout[`${queue.data}`]?.shopDetails && (
                  <View className='px-4'>
                    {(() => {
                      const shopjson = JSON.parse(userCheckout[`${queue.data}`].shopDetails);
                      return (
                        <React.Fragment>
                          <Text className='text-lg'>shop name: {shopjson.shopName}</Text>
                          {/* <Text>description: {shopjson.description}</Text> */}
                          <Text className='text-lg'>address: {shopjson.address}</Text>
                        </React.Fragment>
                      );
                    })()}
                  </View>
                )
              ) : null}
            </View>
            ) : null
          )
        }
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
                  
                  <Text>have you get your order? </Text>
                  
                  <Text>press Yes if you already got your order</Text>
                  <View>
                    <TouchableOpacity 
                      style={{ backgroundColor: '#FFD700', marginTop: 10, padding: 10, borderRadius: 5 }}
                      onPress={() => {
                        alreadyPickupOrder()
                        setOpenModal(false);
                      }}>
                      <Text style={{ textAlign: 'center' }}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className='mt-5 p-3 rounded-lg bg-gray-500'
                      onPress={() => {
                        setOpenModal(false);
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