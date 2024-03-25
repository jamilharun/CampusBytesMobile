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

export default function OrderScreen({route, navigation}) {
  // const {} = route.params;
  const { user } = useContext(AuthContext);
  const shop = useSelector(selectShop)
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(null);
  
//   const { data: } = useQuery({ 
//     queryKey: [`checkout data`], 
//     queryFn: fetchCheckout(user.sub),
//     gcTime: 10000000,
//     staleTime: 1000,
//     refetchInterval: 100000,
//     refetchOnWindowFocus: true,
//     retry: (failureCount, error) => {
//       // Define your retry logic here
//       if (failureCount < 3) { // Retry only twice (including the initial attempt)
//         return true; // Retry on the next error
//       }
//       return false; // Don't retry after the second attempt
//     }
// });

  console.log('shop: ',shop);
  return (
    
      <View className='flex-1'>
          <TouchableOpacity 
              onPress={()=>{
                
                navigation.navigate('home')}}
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
                          <Text className=' text-5xl text-center'>0</Text>
                        </View>
                      </View>
                      
                </View>
                <View className='px-5 pt-5'>
                  <Text>your orders:</Text>
                  <View>
                    {
                      //orders
                    }
                  </View>
                  <Text>Shop information:</Text>
                  <View>
                    {
                      //shop info
                    }
                  </View>
                  <Text>payment Info:</Text>
                  <View>
                    
                  </View>
                </View>
                {/* <Image className=' w-24 h-24' source={()=>{}}/> */}
            </View>    
        </ScrollView>
      </View>
        
  )
}

