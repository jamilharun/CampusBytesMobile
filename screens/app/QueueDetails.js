import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { ChevronLeft } from 'react-native-feather';
import { useQuery } from '@tanstack/react-query';
import { fetchCheckout } from '../../apis/server';
import { AuthContext } from '../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
export default function QueueDetails({route, navigation}) {
  const {item} = route.params;
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState()
  
  const id = 'user.sub'
  const isFocused = useIsFocused();

  // ... rest of your component logic

  const { data: userCheckout } = useQuery({
    queryKey: [`userCheckout`],
    queryFn: () => fetchCheckout(id),
    refetchOnWindowFocus: isFocused, // Only refetch when focused
    keepPreviousData: true,
  // refetchInterval: 10000,
    refetchOnWindowFocus: true
  
  });

  

// const { data: userCheckout} = useQuery({ 
//   queryKey: [`userCheckout`], 
//   queryFn: () => fetchCheckout(id),
//   refetchOnWindowFocus: true,
// });

if (userCheckout && userCheckout[item.data]) {
  const itemsJson = userCheckout[item.data].items.map(item => JSON.parse(item));
  setItems(itemsJson);
}

console.log('userCheckout',userCheckout);
  return (
    <View>
      <View className=' relative py-4 shadow-sm'>
            <View className=''>
                <TouchableOpacity 
                    onPress={()=>{navigation.goBack()}}
                    className="TahitiGold pl-3 rounded-full absolute z-50">
                    <ChevronLeft
                    className="text-EacColor-BlackPearl"
                    style={{ width: 28, height: 28 }}/>
                </TouchableOpacity>
                <Text className=' text-center font-bold text-xl'>Your queue</Text>
                {/* <Text className=' text-center text-gray-500'>{shop.name   }</Text> */}
            </View>
        </View>
        <ScrollView>

          {userCheckout && userCheckout[item.data] && (
            <View>
              <View>
                <Text>checkout information:</Text>
                <Text>id: {userCheckout[item.data].checkout.checkoutid}</Text>
                <Text>created at: {userCheckout[item.data].checkout.created_at}</Text>
                <Text>deliveryfee: {userCheckout[item.data].checkout.deliveryfee}</Text>
                <Text>PickedUp: {userCheckout[item.data].checkout.isfinished}</Text>
                <Text>prioritize: {userCheckout[item.data].checkout.isspecial}</Text>
                <Text>location: {userCheckout[item.data].checkout.location}</Text>
                <Text>paymentid: {userCheckout[item.data].checkout.paymentid}</Text>
                <Text>serviceFee: {userCheckout[item.data].checkout.servicetax}</Text>
                <Text>totalAmount: {userCheckout[item.data].checkout.totalamount}</Text>
                {/* <Text>: {userCheckout[item.data].checkout}</Text> */}
                
              </View>
              <View>
                <Text>order information:</Text>
                {
                  items?.map(item=>{
                    <View key={item?._id}>
                      <Text>{item.dishName ? item.dishName : item.productName}</Text>
                    </View>
                  })
                }
                <Text></Text>
              </View>
              
              {/* Display other relevant data from userCheckout[item.data] */}
            </View>
          )}
        </ScrollView>

    </View>
  )
}