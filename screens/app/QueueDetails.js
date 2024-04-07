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
          userPickup && <View className='px-4 py-4 '>
            <Text className='text-xl '>Your Order is Ready to pickup!</Text>
          </View>
        }

        {
          userCheckout &&
            userPickup?.map((pickup, index)=>
            pickup ? (
              <View className='py-4 px-4' key={index}>
                <Text>click the green to confirm checkout</Text>
                <View className='bg-limeGreen rounded-full'>
                  {
                    userCheckout[`${pickup.data}`]?.checkout.isfinished ? (
                      <TouchableOpacity className='flex flex-row justify-between items-center'>
                        <Text className='text-3xl w-1/2 text-center'>{pickup.index}</Text>
                        <Text className='text-3xl w-1/2 text-center'>{pickup.data}</Text>    
                      </TouchableOpacity>
                    ) : (
                      <View className='flex flex-row justify-between items-center'>
                        <Text className='text-3xl w-1/2 text-center'>{pickup.index}</Text>
                        <Text className='text-3xl w-1/2 text-center'>{pickup.data}</Text>
                      </View>
                    )
                  }
                  <View className='flex flex-row justify-between items-center'>
                    <Text className='text-xl w-1/2 text-center'>pickup</Text>
                    <Text className='text-xl w-1/2 text-center'>orderid</Text>
                  </View>
                </View>
              <Text className='mt-3 font-bold'>Order information</Text>
              <View>
                  <Text>Payment: {userCheckout[`${pickup.data}`]?.checkout.totalamount}</Text>
                  <Text>Delivery fee: {userCheckout[`${pickup.data}`]?.checkout.deliveryfee}</Text>
                  <Text>Service fee: {userCheckout[`${pickup.data}`]?.checkout.servicetax}</Text>
              </View>
              
              <Text className='mt-3 font-bold'>Order Items</Text>
              {
                userCheckout[`${pickup.data}`]?.items.map((item, index) => {
                  let itemjson = JSON.parse(item)
                  let cartjson = JSON.parse(userCheckout[`${pickup.data}`]?.cartstring)
                  console.log(cartjson[index].cartid);
                  return <View key={index}>
              
                    <View>
                      <Text>item name: {itemjson.dishName ? itemjson.dishName : itemjson.productName}</Text> 
                      <Text>Type: {itemjson._type}</Text>
                      <Text>Price: {itemjson.price ? itemjson.price : itemjson.Price}</Text>                    
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
                  </View>
                })
              }
              
              <Text className='mt-3 font-bold'>Shop Details</Text>
              {pickup.data ? (
                userCheckout[`${pickup.data}`]?.shopDetails && (
                  <View>
                    {(() => {
                      const shopjson = JSON.parse(userCheckout[`${pickup.data}`].shopDetails);
                      return (
                        <React.Fragment>
                          <Text>shop name: {shopjson.shopName}</Text>
                          {/* <Text>description: {shopjson.description}</Text> */}
                          <Text>address: {shopjson.address}</Text>
                        </React.Fragment>
                      );
                    })()}
                  </View>
                )
              ) : null}
              <Text className='mt-3 font-bold'>Order Meta data</Text>
              <View>
                  <Text>Shop id: {userCheckout[`${pickup.data}`]?.checkout.shopref}</Text>
                  <Text>user id: {userCheckout[`${pickup.data}`]?.checkout.userref}</Text>
                  <Text>payment id: {userCheckout[`${pickup.data}`]?.checkout.paymentid}</Text>
                  <Text>Location: {userCheckout[`${pickup.data}`]?.checkout.location}</Text>
                  {/* <Text>payment success: {userCheckout[`${queue.data}`]?.checkout.paysuccess ? 'true' : 'false'}</Text> */}
                  <Text>picked up: {userCheckout[`${pickup.data}`]?.checkout.isfinished ? 'true' : 'false'}</Text>
                  <Text>Priority: {userCheckout[`${pickup.data}`]?.checkout.isspecial ? 'true' : 'false'}</Text>
                  <Text>ordered_at: {userCheckout[`${pickup.data}`]?.checkout.created_at}</Text>
              </View>

              </View>
            ) : null)
        }

{/* 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 */}

        {
        userCheckout &&
          userQueue.map((queue, index)=>
            queue ? (
            <View className='py-4 px-4 mb-20' key={index}>
              <View className='bg-babyBlue rounded-full'>
                {
                  userCheckout[`${queue.data}`]?.checkout.isfinished ? (
                    <TouchableOpacity 
                      onPress={()=>{
                        setOpenModal(true)
                        getHandleId(queue.data)}}
                      className='flex flex-row justify-between items-center'>
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
              <Text className='mt-3 font-bold'>Order information</Text>
              <View>
                  <Text>Payment: {userCheckout[`${queue.data}`]?.checkout.totalamount}</Text>
                  <Text>Delivery fee: {userCheckout[`${queue.data}`]?.checkout.deliveryfee}</Text>
                  <Text>Service fee: {userCheckout[`${queue.data}`]?.checkout.servicetax}</Text>
              </View>
              
              <Text className='mt-3 font-bold'>Order Items</Text>
              {
                userCheckout[`${queue.data}`]?.items.map((item, index) => {
                  let itemjson = JSON.parse(item)
                  // let shopjson = JSON.parse(userCheckout[`${queue.data}`]?.shopDetails)
                  // console.log(userCheckout[`${queue.data}`]?.cartstring);
                  let cartjson = JSON.parse(userCheckout[`${queue.data}`]?.cartstring)
                  console.log(cartjson[index].cartid);
                  return <View>
              
                    <View>
                      <Text>item name: {itemjson.dishName ? itemjson.dishName : itemjson.productName}</Text> 
                      <Text>Type: {itemjson._type}</Text>
                      <Text>Price: {itemjson.price ? itemjson.price : itemjson.Price}</Text>                    
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
                    {/* <Text className='mt-3 font-bold'>Shop Details</Text>
                    <View>
                      <Text>shop name: {shopjson.shopName}</Text>
                      <Text>description: {shopjson.description}</Text>
                      <Text>address: {shopjson.address}</Text>
                    </View> */}
                  </View>
                })
              }
              
              <Text className='mt-3 font-bold'>Shop Details</Text>
              {queue.data ? (
                userCheckout[`${queue.data}`]?.shopDetails && (
                  <View>
                    {(() => {
                      const shopjson = JSON.parse(userCheckout[`${queue.data}`].shopDetails);
                      return (
                        <React.Fragment>
                          <Text>shop name: {shopjson.shopName}</Text>
                          {/* <Text>description: {shopjson.description}</Text> */}
                          <Text>address: {shopjson.address}</Text>
                        </React.Fragment>
                      );
                    })()}
                  </View>
                )
              ) : null}
              <Text className='mt-3 font-bold'>Order Meta data</Text>
              <View>
                  <Text>Shop id: {userCheckout[`${queue.data}`]?.checkout.shopref}</Text>
                  <Text>user id: {userCheckout[`${queue.data}`]?.checkout.userref}</Text>
                  <Text>payment id: {userCheckout[`${queue.data}`]?.checkout.paymentid}</Text>
                  <Text>Location: {userCheckout[`${queue.data}`]?.checkout.location}</Text>
                  {/* <Text>payment success: {userCheckout[`${queue.data}`]?.checkout.paysuccess ? 'true' : 'false'}</Text> */}
                  <Text>picked up: {userCheckout[`${queue.data}`]?.checkout.isfinished ? 'true' : 'false'}</Text>
                  <Text>Priority: {userCheckout[`${queue.data}`]?.checkout.isspecial ? 'true' : 'false'}</Text>
                  <Text>ordered_at: {userCheckout[`${queue.data}`]?.checkout.created_at}</Text>
              </View>
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