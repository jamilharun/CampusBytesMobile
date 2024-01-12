import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Categories from "../../components/categories";
import FeaturedRow from "../../components/featuredRow";
import { Map, Menu, Search, Sliders } from "react-native-feather";
import { AuthContext } from "../../context/AuthContext";
import client from "../../apis/sanity";
import { fetchingProdDish } from "../../utils/query";
import ShopCard from "../../components/ShopCard";
import { DrawerActions, useNavigation } from "@react-navigation/native";

// sample user data | remove this after testing
// import { user } from '../constants/sampleuser';
export default function HomeScreen() {
  const [loading, setLoading] = useState(false)
  const [event, setEvent] = useState("Welcome Home");
  const [shopShowCase, getShopShowCase] = useState(null)
  // auth0 line of code!!!
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const fetchData = () => {
    try {
      client
        .fetch(fetchingProdDish)
        .then((data)=>{
          console.log(data)
          getShopShowCase(data)
          setEvent('fetching shop successful')
        })
    } catch (err) {
      console.log(err);
      setEvent(err)
    }
  }

  const initialFetch = () => {
    useState(() => {
      fetchData()
    });
  }
  initialFetch()
  
  useEffect(()=>{
    console.log(event);
  },[event])

  
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
          {/* <Text>user_id:{user?.user_id}</Text>
          <Text>name:{user?.name}</Text>
          <Text>nickname:{user?.nickname}</Text>
          <Text>email:{user?.email}</Text>
          <Text>pic:{user?.picture}</Text>
          <Image source={user?.picture} className="w-20 h-20 rounded-full" /> */}
            {
              shopShowCase ? (
                // console.log(shopShowCase)
                shopShowCase?.map((shop)=>{
                  return(
                    <ShopCard
                      id={shop._id}
                      shopName={shop.shopName}
                      logo={shop.logo}
                      cover={shop.cover}
                      address={shop.address}
                      latitude={shop.latitude}
                      longitude={shop.longitude}
                      description={shop.description}
                      products={shop.products}
                      dishes={shop.dishes}
                      isisActive={shop.isActive}
                      isVerified={shop.isVerified}
                    />
                  )
                })
              ) : (
                <View className=" flex justify-center items-center">
                  <ActivityIndicator size={"large"} />
                </View>
              )
            }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
