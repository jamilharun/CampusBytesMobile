// import { StatusBar } from "expo-status-bar";
// import React, { useContext, useEffect, useState } from "react";
// import { View, Text, TextInput, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Categories from "../../components/categories";
// import { AuthContext } from "../../context/AuthContext";
// import client, { sanityFetch } from "../../apis/sanity";
// import { fetchAllDishes, fetchingProdDish, qfas } from "../../utils/query";
// import ShopCard from "../../components/ShopCard";
// import { DrawerActions, useNavigation } from "@react-navigation/native";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import Header from "../../components/header";

// // sample user data | remove this after testing
// // import { user } from '../constants/sampleuser';
// export default function ShopsScreen() {
//   const [loading, setLoading] = useState(false)
//   const [event, setEvent] = useState("Welcome Home");
//   const [err, setErr] = useState(null);
//   // const [shopShowCase, getShopShowCase] = useState(null)
//   // auth0 line of code!!!
//   const { user } = useContext(AuthContext);
//   const navigation = useNavigation();

//   const queryClient = useQueryClient();

//   const fetchAllShops = async () => {
//     try {
//       const sanRes = await sanityFetch(qfas);
//       if (!sanRes) {
//         console.log('Error in fetching data from sanity', sanRes);
//         return null
//       } else {
//         console.log(`fetching successful`);
//         return sanRes;
//       }
//     } catch (error) {
//       const fE = `Error in fetching data from sanity: ${error}`;
//       console.log(fE);
//       return null;    
//     }
//   };

//   const { data: shops, isLoading, error, isFetching} = useQuery({ 
//     queryKey: ['shops'], 
//     queryFn: fetchAllShops,
//     gcTime: 10000,
//   });
  
//   console.log({isLoading, isFetching, error, shops });

//   if (isLoading) {
//     return <Text>Loading....</Text>
//   }

//   if (error) {
//     setErr(error);
//   }

//   return (
//     <SafeAreaView className="bg-white">
//       <StatusBar barStyle="dark-Content" />
//         <Header/>
//         <ScrollView
//           className='pb-36'
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingBottom: 20,
//           }}
//         >
//           <View className=" mt-5">
//               {
//                 shops ? (
//                   // console.log(shopShowCase)
//                   shops?.map((shop)=>{
//                     return(
//                       <ShopCard
//                         _type={shop._type}
//                         _id={shop._id}
//                         shopName={shop.shopName}
//                         slug={shop.slug}
//                         logo={shop.logo}
//                         cover={shop.cover}
//                         address={shop.address}
//                         latitude={shop.latitude}
//                         longitude={shop.longitude}
//                         description={shop.description}
//                         isActive={shop.isActive}
//                         isFeatured={shop.isFeatured}
//                         isPromoted={shop.isPromoted}
//                         tags={shop.tags}
//                       />
//                     )
//                   })
//                 ) : (
//                   <View className=" flex justify-center items-center">
//                     <ActivityIndicator size={"large"} />
//                   </View>
//                 )
//               }
//           </View>
//         </ScrollView>
//     </SafeAreaView>
//   );
// }
