import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ChevronLeft } from 'react-native-feather';
import { useQuery } from '@tanstack/react-query';
import { fetchCheckout } from '../../apis/server';
import { AuthContext } from '../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
export default function QueueDetails({route, navigation}) {
  const {userQueue} = route.params;
  const { user } = useContext(AuthContext);
  const [userCheckOut, setUserCheckOut] = useState()
  

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
        userCheckout &&
          userQueue.map((queue, index)=>
            queue ? (
            <View 
              className='py-4 px-4 mb-20'
              key={index}>
              <View className='flex flex-row justify-between items-center'>
                <Text className='text-3xl w-1/2 text-center'>{queue.index}</Text>
                <Text className='text-3xl w-1/2 text-center'>{queue.data}</Text>
              </View>
              <View className='flex flex-row justify-between items-center'>
                <Text className='text-xl w-1/2 text-center'>queue</Text>
                <Text className='text-xl w-1/2 text-center'>orderid</Text>
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
                userCheckout[`${queue.data}`].shopDetails && (
                  <View>
                    {(() => {
                      const shopjson = JSON.parse(userCheckout[`${queue.data}`].shopDetails);
                      return (
                        <React.Fragment>
                          <Text>shop name: {shopjson.shopName}</Text>
                          <Text>description: {shopjson.description}</Text>
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
                  <Text>payment success: {userCheckout[`${queue.data}`]?.checkout.paysuccess ? 'true' : 'false'}</Text>
                  <Text>picked up: {userCheckout[`${queue.data}`]?.checkout.isfinished ? 'true' : 'false'}</Text>
                  <Text>Priority: {userCheckout[`${queue.data}`]?.checkout.isspecial ? 'true' : 'false'}</Text>
                  <Text>ordered_at: {userCheckout[`${queue.data}`]?.checkout.created_at}</Text>
              </View>
            </View>
            ) : null
          )
        }
        </ScrollView>

    </View>
  )
}