import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Categories from "../../components/categories";
import FeaturedRow from "../../components/featuredRow";
import { Map, Menu, Search, Sliders } from "react-native-feather";
import { AuthContext } from "../../context/AuthContext";
import client, { sanityFetch } from "../../apis/sanity";
import { fetchAllDishes, fetchingProdDish } from "../../utils/query";
import ShopCard from "../../components/ShopCard";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DishCard from "../../components/dishCard";

// sample user data | remove this after testing
// import { user } from '../constants/sampleuser';
export default function HomeScreen() {
  const [loading, setLoading] = useState(false)
  const [event, setEvent] = useState("Welcome Home");
  const [err, setErr] = useState(null);
  // const [shopShowCase, getShopShowCase] = useState(null)
  // auth0 line of code!!!
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const fetchAllAvailable = async () => {
    try {
      const sanRes = await sanityFetch(fetchAllDishes);
      if (!sanRes) {
        console.log('Error in fetching data from sanity', sanRes);
        return null
      } else {
        console.log(`fetching successful`);
        return sanRes;
      }
    } catch (error) {
      const fE = `Error in fetching data from sanity: ${error}`;
      console.log(fE);
      return null;    
    }
  };

  const { data: dishes, isLoading, error, isFetching} = useQuery({ 
    queryKey: ['dishes'], 
    queryFn: fetchAllAvailable,
    gcTime: 10000,
  });
  
  console.log({isLoading, isFetching, error, dishes});

  if (isLoading) {
    return <Text>Loading....</Text>
  }

  if (error) {
    setErr(error);
  }

  
  
  //filler Code for debugging
  if (!user) {
    // console.log("no data found");
    // alert("no data found");
  }

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-Content" />
      <View className="flex-row items-center space-x-2 px-4 ">
        <TouchableOpacity 
          onPress={()=>{
            navigation.dispatch(DrawerActions.openDrawer())
          }}
          className=" bg-EacColor-TahitiGold p-3 rounded-full">
          <Menu height="20" width="20" strokeWidth={2.5} stroke="white" />
        </TouchableOpacity>
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          {/* drawer button */}

          <Search height="25" width="25" className=" text-gray-600" />
          <TextInput placeholder="Restaurants" className="ml-2 flex-1" />
          {/* <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-gray-300">
            <Map height="20" width="20" />
            <Text className=" text-gray-600">Eac, Cavite</Text>
          </View> */}
        </View>
        <View className=" bg-EacColor-TahitiGold p-3 rounded-full">
          <Sliders height="20" width="20" strokeWidth={2.5} stroke="white" />
        </View>
      </View>
      
      <View>

      </View>
      <ScrollView
        className='pb-36'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
      
        {/* categories */}
        <Categories />

        <View className=" mt-5">
            {
              dishes ? (
                dishes?.map((dish)=>{
                  return(
                    <DishCard
                    isPromoted={dish?.isPromoted}
                    dishName={dish?.dishName}
                    isFeatured={dish?.isFeatured}
                    isAvailable={dish?.isAvailable}
                    preparationTime={dish?.preparationTime}
                    _id={dish?._id}
                    description={dish?.description}
                    price={dish?.price}
                    image={dish?.image}
                    shop={dish?.shop}
                    tags={dish?.tags}/>
                  )
                })
              ) : (
                <View className=" flex justify-center items-center">
                   <ActivityIndicator size={"large"} />
                 </View>
              )
              // shopShowCase ? (
              //   // console.log(shopShowCase)
              //   shopShowCase?.map((shop)=>{
              //     return(
              //       <ShopCard
              //         id={shop._id}
              //         shopName={shop.shopName}
              //         logo={shop.logo}
              //         cover={shop.cover}
              //         address={shop.address}
              //         latitude={shop.latitude}
              //         longitude={shop.longitude}
              //         description={shop.description}
              //         products={shop.products}
              //         dishes={shop.dishes}
              //         isisActive={shop.isActive}
              //         isVerified={shop.isVerified}
              //       />
              //     )
              //   })
              // ) : (
              //   <View className=" flex justify-center items-center">
              //     <ActivityIndicator size={"large"} />
              //   </View>
              // )
            }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
