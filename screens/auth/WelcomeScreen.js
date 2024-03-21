import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Entypo } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const [event, setEvent] = useState("welcome to CampusBytes");

  const navigation = useNavigation();

  const moveToLogin = () => {
    setEvent("you click move to Login");
    try {
      navigation.navigate("Login");
    } catch (error) {
      console.log(e + error);
    }
  };

  useEffect(() => {
    console.log(event);
  }, [event]);

  return (
    <SafeAreaView className="flex-1 bg-EacColor-SelectiveYellow">
      <View className=" flex-1 flex justify-around my-4">
        <View className=" flex-col justify-center items-center">
          <Entypo name="shop" size={200} color="white" />        
          <Text className="text-white font-bold text-4xl text-center font-Poppins">
            Welcome to CampusBytes!
          </Text>
      
        </View>
        <View className=" space-y-4 ">
          <TouchableOpacity
            onPress={() => {
              moveToLogin();
            }}
            className="py-3 mx-20  bg-EacColor-DeepFir rounded-2xl"
          >
            <Text className="text-xl font-bold text-center text-white font-Poppins">
              Let's Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
