import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Categories from "../../components/categories";
import FeaturedRow from "../../components/featuredRow";
import { Map, Menu, Search, Sliders } from "react-native-feather";
import { AuthContext } from "../../context/AuthContext";
import { sanityFetch } from "../../apis/sanity";
import { fetchAllDishes, fetchingProdDish } from "../../utils/query";
import ShopCard from "../../components/ShopCard";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DishCard from "../../components/dishCard";
import Header from "../../components/header";

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

      <Header/>

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
                  isPromoted={      dish?.isPromoted}
                  dishName={        dish?.dishName}
                  isFeatured={      dish?.isFeatured}
                  isAvailable={     dish?.isAvailable}
                  preparationTime={ dish?.preparationTime}
                  _id={             dish?._id}
                  description={     dish?.description}
                  price={           dish?.price}
                  image={           dish?.image}
                  shop={            dish?.shop}
                  tags={            dish?.tags}/>
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
