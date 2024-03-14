import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {View, Image, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import { ChevronLeft, MapPin } from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from '../../slices/ShopSlice';
import { emptyCart } from '../../slices/CartSlice';
import { MaterialIcons } from '@expo/vector-icons';

export default function OrderScreen({groupedItems}) {
  const navigation = useNavigation();
  const shop = useSelector(selectShop)
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     navigation.navigate('Prepairing')
  //   }, 3000)
  // })

  const cancelOrder = () => {
    navigation.goBack()
    dispatch(emptyCart())
  }

  console.log(shop);
  return (
      <View className='flex-1'>
          <TouchableOpacity 
              onPress={()=>{
                
                navigation.navigate('featured')}}
              className="bg-EacColor-TahitiGold ml-3 mt-3  rounded-full absolute z-50">
                  <ChevronLeft
                  className="text-EacColor-BlackPearl"
                  style={{ width: 28, height: 28 }}/>
          </TouchableOpacity>
          <Image className='w-full h-3/4' source={require('../../assets/images/eacCanteen.jpg')}/>
          <View className=' rounded-t-3xl -mt-12  bg-white relative'>
              <View className=' flex-row justify-between px-5 pt-10'>
                  <View>
                      <Text className=' text-lg text-gray-700 font-semibold'>Queue Count down</Text>
                      <Text className=' text-3xl text-gray-700 font-extrabold'>priority system countdown</Text>
                      <Text className=' mt-2text-gray-700 font-semibold'>Your Order is Upcoming!!</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={cancelOrder}
                    className='flex justify-end items-center'>
                    <MaterialIcons name="cancel" size={45} color="orange" />
                  </TouchableOpacity>
              </View>
              {/* <Image className=' w-24 h-24' source={()=>{}}/> */}
          </View>    
      </View>
        
  )
}

