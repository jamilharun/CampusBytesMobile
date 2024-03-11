import { View, TextInput, TouchableOpacity } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Map, Menu, Search, Sliders } from "react-native-feather";
import React from 'react'

export default function Header() {
    const navigation = useNavigation();
    return (
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
    )
}