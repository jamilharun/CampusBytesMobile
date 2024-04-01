import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../context/AuthContext";import { sanityFetch, urlFor } from "../../apis/sanity";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "../../components/header";
import { fetchCheckout, fetchShop, fetchUserQueue, getMyQueue } from "../../apis/server";
import { MapPin } from 'react-native-feather';
import { useDispatch, useSelector } from "react-redux";
import { selectShop, setShop } from "../../slices/ShopSlice";
import { emptyCart } from "../../slices/CartSlice";

// sample user data | remove this after testing
// import { user } from '../constants/sampleuser';
export default function HomeScreen() {
  // const [loading, setLoading] = useState(false)
  // const [event, setEvent] = useState("Welcome Home");
  const [err, setErr] = useState(null);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const queryClient = useQueryClient();
  // const dispatch = useDispatch();

  // const shopItem = useSelector(selectShop)

  // const [userQueue, setUserQueue] = useState(null)
  
  

const { data: sdp, isLoading, error, isFetching} = useQuery({ 
    queryKey: [`shopDisplay`], 
    queryFn: fetchShop,
    gcTime: 12 * 60 * 60 * 1000,
    staleTime: 24 * 60 * 60 * 1000,
    refetchInterval: 12 * 60 * 60 * 1000,
    keepPreviousData: true, 
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => {
      // Define your retry logic here
      if (failureCount < 3) { // Retry only twice (including the initial attempt)
        return true; // Retry on the next error
      }
      return false; // Don't retry after the second attempt
    },
});
// console.log({isLoading, isFetching, error, sdp});
if (isLoading) {
    return (
        <View className='w-full h-64 flex justify-center items-center'>
          <Text className='text-2xl'>Loading...</Text>
        </View>
      )
}
if (error) setErr(error);

// const handleRefresh = () => {
//   refetch(); // Manually refetch data on button click or other event
// };
// const checkingout = {
//   checkoutid: 24,
//   paymentref: 89,
//   userref: "user.sub",
//   shopref: "42662a99-47b5-490d-915b-597b2f8cdbf9",
//   groupnum: 653,
//   servicetax: 111,
//   deliveryfee: 0,
//   totalamount: 1000,
//   location: "",
//   isspecial: false,
//   iscanceled: false,
//   isfinished: false,
//   created_at: "dfsdfsdfsdf"
// }

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-Content" />

      <Header/>

      {/* for debugging only */}
      {/* <TouchableOpacity onPress={()=>navigation.navigate('Order', {checkingout})}>
        <Text>order debugging</Text>
      </TouchableOpacity> */}

      <ScrollView
        className='pb-36'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <View className=" mt-5">
          {
            sdp?.map(data => {
              if (data.isActive === true) {
                return (
                  <TouchableOpacity 
                  onPress={()=> navigation.navigate('featured', {data})}
                    key={data._id}>
                      <View 
                        style={{borderTopLeftRadius:40, borderTopRightRadius: 40}}
                        className=' bg-white '>
                        <View>
                          <Image className='h-32 w-full object-cover rounded-xl mt-1' source={{ uri: urlFor(data?.cover).url()}}/>
                        </View>
                        <View className='flex flex-row mx-3 '>
                            <Image 
                              className='h-32 w-24 object-cover rounded-xl mt-1' 
                              source={{ uri: urlFor(data?.logo).url()}}/>
                                <View className=' px-5'>
                                  <Text className=' text-3xl font-bold'>{data?.shopName}</Text>
                                  <View className=' flex-row space-x-2 my-1'>
                                  <View className=' flex-row items-center space-x-1'>
                                  <Text className=' text-xs'>
                                  <Text className=' text-EacColor-SelectiveYellow'>rating</Text>
                                </Text>
                              </View>
                              <View className=' flex-row items-center space-x-1'>
                                <MapPin color='gray' width='15'/>
                                <Text numberOfLines={3} className=' text-gray-700 text-xs'>Nearby.{data?.address}</Text>
                              </View>
                            </View>
                              <Text numberOfLines={3} className=' text-gray-500 mt-2'>{data?.description}</Text>
                                {
                                    data?.tags?.map((tag) => {
                                        return (
                                            <View key={tag._id} className=' flex-row items-center space-x-1'>
                                                <Text className=' text-gray-500 text-xs'>{tag.tagName}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                          </View>
                      </View>
                    </TouchableOpacity>
                )
              }
            }) 
                
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
