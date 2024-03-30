import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronLeft, MapPin } from 'react-native-feather';
import { getAllShopQueue, getMyShopQueue } from '../../apis/server';
import { Feather, AntDesign, FontAwesome, Entypo   } from '@expo/vector-icons';

export default function QueueListScreen({route, navigation}) {
  const {ysd} = route.params;

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
          <Text className='w-1/2 text-center text-xl font-bold'>orderid</Text>
        </View>
        <ScrollView>
          {/* if priority order exist */}
          <View className='bg-EacColor-SelectiveYellow py-4 px-4'>
            <View className='flex flex-row justify-between items-center'>
              <Text className='text-2xl pb-3'>Priority:</Text>
              <AntDesign name="checkcircleo" size={25} color="green"/>
            </View>
            
            <View className='flex flex-row items-center'>
              <View className='w-1/2'>
                <Text className=' text-2xl text-center rounded-full'>1</Text>
              </View>
              <View className='w-1/2'>
                <Text className='text-xl overflow-hidden'>Name123</Text>
                <Text className='text-xl overflow-hidden'>orderID: 12</Text>
                {
                  // if location exist then buyyer expect food to be delivered on that location
                }
                <Text className='text-xl overflow-hidden'>Location: b2 f2 room 320</Text>
              </View>
            </View>
            <View>

            <Text className='mt-3 text-xl '>Order Items:</Text>
              {/* {
                userCheckout[`${queue.data}`]?.items.map(item => {
                  let itemjson = JSON.parse(item)
                  return <View>
                    <Text>item name: {itemjson.dishName ? itemjson.dishName : itemjson.productName}</Text> 
                    <Text>Price: {itemjson.price ? itemjson.price : itemjson.Price}</Text>                    
                    <Text>Type: {itemjson._type}</Text>
                  </View>
                })
              } */}
            <Text className='mt-3 text-xl'>Order Meta data</Text>
              {/* <View>
                  <Text>Shop id: {userCheckout[`${queue.data}`]?.checkout.shopref}</Text>
                  <Text>user id: {userCheckout[`${queue.data}`]?.checkout.userref}</Text>
                  <Text>payment id: {userCheckout[`${queue.data}`]?.checkout.paymentid}</Text>
                  <Text>Location: {userCheckout[`${queue.data}`]?.checkout.location}</Text>
                  <Text>payment success: {userCheckout[`${queue.data}`]?.checkout.paysuccess ? 'true' : 'false'}</Text>
                  <Text>picked up: {userCheckout[`${queue.data}`]?.checkout.isfinished ? 'true' : 'false'}</Text>
                  <Text>Priority: {userCheckout[`${queue.data}`]?.checkout.isspecial ? 'true' : 'false'}</Text>
                  <Text>ordered_at: {userCheckout[`${queue.data}`]?.checkout.created_at}</Text>
              </View> */}
            </View>
          </View>

          <View className='py-4 px-4'>
            <TouchableOpacity 
              onPress={()=>{handleFinishOrder()}}
              className='flex flex-row justify-end '>
              <AntDesign name="checkcircleo" size={25} color="green"/>
            </TouchableOpacity>
            <View className='flex flex-row items-center'>
              <View className='w-1/2'>
                <Text className=' text-2xl text-center rounded-full'>2</Text>
              </View>
              <View className='w-1/2'>
                <Text className='text-xl overflow-hidden'>Name123</Text>
                <Text className='text-xl overflow-hidden'>orderID: 12</Text>
              </View>
            </View>
            <View>

            <Text className='mt-3 text-xl '>Order Items:</Text>
              {/* {
                userCheckout[`${queue.data}`]?.items.map(item => {
                  let itemjson = JSON.parse(item)
                  return <View>
                    <Text>item name: {itemjson.dishName ? itemjson.dishName : itemjson.productName}</Text> 
                    <Text>Price: {itemjson.price ? itemjson.price : itemjson.Price}</Text>                    
                    <Text>Type: {itemjson._type}</Text>
                  </View>
                })
              } */}
            <Text className='mt-3 text-xl'>Order Meta data</Text>
              {/* <View>
                  <Text>Shop id: {userCheckout[`${queue.data}`]?.checkout.shopref}</Text>
                  <Text>user id: {userCheckout[`${queue.data}`]?.checkout.userref}</Text>
                  <Text>payment id: {userCheckout[`${queue.data}`]?.checkout.paymentid}</Text>
                  <Text>Location: {userCheckout[`${queue.data}`]?.checkout.location}</Text>
                  <Text>payment success: {userCheckout[`${queue.data}`]?.checkout.paysuccess ? 'true' : 'false'}</Text>
                  <Text>picked up: {userCheckout[`${queue.data}`]?.checkout.isfinished ? 'true' : 'false'}</Text>
                  <Text>Priority: {userCheckout[`${queue.data}`]?.checkout.isspecial ? 'true' : 'false'}</Text>
                  <Text>ordered_at: {userCheckout[`${queue.data}`]?.checkout.created_at}</Text>
              </View> */}
            </View>
          </View>

          <View className='py-4 px-4'>
            <View className='flex flex-row items-center'>
              <View className='w-1/2'>
                <Text className=' text-2xl text-center rounded-full'>3</Text>
              </View>
              <View className='w-1/2'>
                <Text className='text-xl overflow-hidden'>Name123</Text>
                <Text className='text-xl overflow-hidden'>orderID: 12</Text>
              </View>
            </View>
            <View>

            <Text className='mt-3 text-xl '>Order Items:</Text>
              {/* {
                userCheckout[`${queue.data}`]?.items.map(item => {
                  let itemjson = JSON.parse(item)
                  return <View>
                    <Text>item name: {itemjson.dishName ? itemjson.dishName : itemjson.productName}</Text> 
                    <Text>Price: {itemjson.price ? itemjson.price : itemjson.Price}</Text>                    
                    <Text>Type: {itemjson._type}</Text>
                  </View>
                })
              } */}
            <Text className='mt-3 text-xl'>Order Meta data</Text>
              {/* <View>
                  <Text>Shop id: {userCheckout[`${queue.data}`]?.checkout.shopref}</Text>
                  <Text>user id: {userCheckout[`${queue.data}`]?.checkout.userref}</Text>
                  <Text>payment id: {userCheckout[`${queue.data}`]?.checkout.paymentid}</Text>
                  <Text>Location: {userCheckout[`${queue.data}`]?.checkout.location}</Text>
                  <Text>payment success: {userCheckout[`${queue.data}`]?.checkout.paysuccess ? 'true' : 'false'}</Text>
                  <Text>picked up: {userCheckout[`${queue.data}`]?.checkout.isfinished ? 'true' : 'false'}</Text>
                  <Text>Priority: {userCheckout[`${queue.data}`]?.checkout.isspecial ? 'true' : 'false'}</Text>
                  <Text>ordered_at: {userCheckout[`${queue.data}`]?.checkout.created_at}</Text>
              </View> */}
            </View>
          </View>

          
        </ScrollView>
    </View>
  )
}