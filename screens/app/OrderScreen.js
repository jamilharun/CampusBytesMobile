import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import {View, Image, TouchableOpacity, Text, Dimensions, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { ChevronLeft, MapPin } from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from '../../slices/ShopSlice';
import { emptyCart } from '../../slices/CartSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getnewOrder, getnewQueue } from '../../apis/server';

export default function OrderScreen({route, navigation}) {
  const {newOrder} = route.params;
  const { user } = useContext(AuthContext);
  // const shop = useSelector(selectShop)
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(null);
  const [userQueue, setUserQueue] = useState(null)
  const [co, setco] = useState()

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

  //get checkout once
  console.log(newOrder);
  useEffect(()=>{
    const fetchcheckout = async () => {
      const response = await getnewOrder(newOrder)
      setco(response)
    };
    fetchcheckout()
  },[userQueue])

  // console.log('co: ',co);
  //get queue
  useEffect(() => {
    const fetchData = async () => {
      const response = await getnewQueue(newOrder)
      // const newData = await response.json();
      setUserQueue(response);
    };
    fetchData()
    // const intervalId = setInterval(fetchData, 1 * 60 * 1000); // Refetch every 5 seconds
    // return () => clearInterval(intervalId); // Cleanup function to stop interval on unmount
  }, []); // Empty dependency array ensures effect runs only once after mount
  
  console.log(userQueue);
  // console.log('shop: ',shop);
  return (
      <View className='flex-1'>
          <TouchableOpacity 
              onPress={()=>{navigation.navigate('home')}}
              className="bg-EacColor-TahitiGold ml-3 mt-3  rounded-full absolute z-30">
                  <ChevronLeft
                  className="text-EacColor-BlackPearl"
                  style={{ width: 28, height: 28 }}/>
          </TouchableOpacity>
          <ScrollView className='flex-1'>
            <Image className='w-full ' style={{ height: 475 }}  source={require('../../assets/images/eacCanteen.jpg')}/>
            <View className=' rounded-t-3xl -mt-12  bg-white relative '>
                <View className=' flex-row justify-between px-5 pt-5'>    
                      <View>
                        <View>
                            <Text className=' text-lg text-gray-700 font-semibold'>Queue Count down</Text>
                            <Text className=' text-3xl text-gray-700 font-extrabold'>priority system countdown</Text>
                            <Text className=' mt-2text-gray-700 font-semibold'>Your Order is Upcoming!!</Text>
                        </View>
                        <View className='pt-5'>
                          {
                            userQueue ? (
                              <Text className=' text-5xl text-center'>
                                {userQueue[0].index}
                              </Text>
                            ) : 
                              <Text className=' text-2xl text-center'>*Processing*</Text>}
                          {/* <Text className=' text-5xl text-center'></Text> */}
                        </View>
                      </View>
                </View>
                {
                 co ? (
                  <View className='px-5 pt-5'>
                    <Text className='mt-3 font-bold'>your orders:</Text>
                    {
                      co[`${newOrder?.checkoutid}`].items.map((item, index) => {
                        let itemjson = '';

                        if (typeof item === 'string') {
                            try {
                                itemjson = JSON.parse(item);
                            } catch (error) {
                                // If JSON parsing fails, you can handle the error here
                                console.error('Error parsing JSON:', error);
                                // Assigning the original string to itemjson in case of parsing failure
                                itemjson = item;
                            }
                        } else {
                            // If item is not a string, simply assign it to itemjson
                            itemjson = item;
                        }
                        let cartjson = JSON.parse(co[`${newOrder?.checkoutid}`]?.cartstring)
                        
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
                    
                    <Text className='mt-3 font-bold'>Shop information:</Text>
                    {newOrder?.checkoutid ? (
                      co[`${newOrder?.checkoutid}`].shopDetails && (
                        <View>
                          {(() => {
                            const shopjson = JSON.parse(co[`${newOrder?.checkoutid}`].shopDetails);
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

                    <Text className='mt-3 font-bold'>payment Info:</Text>
                    <View className='pb-5'>
                      <Text>Total Amount: {newOrder?.totalamount - newOrder?.servicetax - newOrder?.deliveryfee}</Text>
                      <Text>Service fee: {newOrder?.servicetax}</Text>
                      <Text>Delivery fee: {newOrder?.deliveryfee}</Text>
                      <Text>Total Amount: {newOrder?.totalamount}</Text>
                    </View>
                  </View>
                 ) : null 
                }
                {/* <Image className=' w-24 h-24' source={()=>{}}/> */}
            </View>    
        </ScrollView>
      </View>
        
  )
}

