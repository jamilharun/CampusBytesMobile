import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {View, Image, TouchableOpacity, Text } from 'react-native';
import { ChevronLeft, MapPin } from 'react-native-feather';
import { useSelector } from 'react-redux';
import { selectShop } from '../../slices/ShopSlice';
import { emptyCart } from '../../slices/CartSlice';
import MapView, { Marker } from 'react-native-maps';

export default function OrderScreen({groupedItems}) {
  const navigation = useNavigation();
  const shop = useSelector(selectShop)
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     navigation.navigate('Prepairing')
  //   }, 3000)
  // })

  const cancelOrder = () => {
    navigation.navigate('featured');
    dispatch(emptyCart())
  }

  console.log(shop);
  return (
    <View className=' flex-1'>
            {/* map view */}
            <MapView
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
                 {/* initialRegion={{
                     latitude: 14.3266,
                     longtitude: 120.9459,
                     latitudeDental: 0.01,
                     longtitudeDentla: 0.01
                 }}
                 className=' flex-1'
                 mapType='standard'
                > */}
                    {/* <Marker
                         coordinate={{
                            latitude: 14.3266,
                            longtitude: 120.9459
                        }}
                         title='eac'
                         description='eac college'
                         pinColor={themeColors.bgColor(1)}
                         /> */}
            {/* </MapView> */}
            <View className=' rounded-t-3xl -mt-12 bg-white relative'>
                <View className=' flex-row justify-between px-5 pt-10'>
                    <View>
                        <Text className=' text-lg text-gray-700 font-semibold'>Queue Count down</Text>
                        <Text className=' text-3xl text-gray-700 font-extrabold'>priority system countdown</Text>
                        <Text className=' mt-2text-gray-700 font-semibold'>Your Order is Upcoming!!</Text>
                    </View>
                </View>
                {/* <Image className=' w-24 h-24' source={()=>{}}/> */}
            </View>
            
        </View>
        
  )
}
