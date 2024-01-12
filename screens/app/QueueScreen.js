import React from 'react'
import { featured } from '../constants'
import { useNavigation } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import { Image, Text, View } from 'react-native';
import { useSelection } from 'react-redux';
import { selectShop } from '../../slices/ShopSlice';


export default function QueueScreen() {
    const Shop = useSelection(selectShop)
    const navigation = useNavigation


    return (
        <View className=' flex-1'>
            {/* map view */}
            <MapView
                initialRegion={{
                    latitude: shop.lat,
                    longtitude: shop.lng,
                    latitudeDental: 0.01,
                    longtitudeDentla: 0.01
                }}
                className=' flex-1'
                mapType='standard'>
                    <Marker
                        coordinate={{
                            latitude: Shop.lat,
                            longtitude: Shop.lng
                        }}
                        title={Shop.name}
                        description={Shop.description}
                        pinColor={themeColors.bgColor(1)}/>
            </MapView>
            <View className=' rounded-t-3xl -mt-12 bg-white relative'>
                <View className=' flex-row justify-between px-5 pt-10'>
                    <View>
                        <Text className=' text-lg text-gray-700 font-semibold'>Queue Count down</Text>
                        <Text className=' text-3xl text-gray-700 font-extrabold'>priority system countdown</Text>
                        <Text className=' mt-2text-gray-700 font-semibold'>Your Order is Upcoming!!</Text>
                    </View>
                </View>
                <Image className=' w-24 h-24' source={require()}/>
            </View>
            
            {/* 
                not gonna use yet because this is for delivery system
            */}
            {/*             
            <View className='bg-EacColor-TahitiGold p-2 flex-row justify-between items-center rounded-full my-5 mx-2'>
                <View className=' p-1 rounded-full'
                    style={{}}>
                        <Image className=' h-16 w-16 rounded-full' source={require()}/>

                </View>

            </View> */}
        </View>
        
  )
}
