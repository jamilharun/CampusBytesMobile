import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "react-native-feather";
import { AuthContext } from "../../context/AuthContext";
import { Entypo } from '@expo/vector-icons';

export default function LoginScreen() {
  const [event, setEvent] = useState("login screen");
  const [loggingIn, setLoggingIn] = useState(null)

  const navigation = useNavigation();
  const { onLogin, isLoading, error } = useContext(AuthContext);

  // const [email, setEmail] = useState(null)
  // const [password, setPassword] = useState(null)
  const clickToFoBack = () => {
    setEvent("going back");
    try {
      navigation.goBack();
    } catch (err) {
      setEvent(err);
    }
  };

  const toLogin = () => {
    setEvent("logging in");
    try {
      onLogin();
    } catch (err) {
      setEvent(err);
    }
  };

  useEffect(() => {
    console.log(event);
  }, [event]);

  return (
    <View className="flex-1 bg-EacColor-SelectiveYellow">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => {
              clickToFoBack();
            }}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ChevronLeft
              className="text-EacColor-BlackPearl"
              style={{ width: 28, height: 28 }}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          {/* <Image  style={{width: 200, height: 200}}/> */}
          <Entypo name="shop" size={154} color="white" />        
          {/* <Image className="w-64 h-64  text-EacColor-BlackPearl" source={require('../../assets/favicon.png')}/> */}
        </View>

      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-20 "
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        {loggingIn ? (
          <View className=" flex justify-center items-center">
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <View>  
            <Text className="text-2xl pb-4 ">Login</Text>
            {/* auth0 login */}
            <View className=''>
              <TouchableOpacity
              onPress={() => {
                toLogin();
                setLoggingIn(true)
              }}
              className=" py-3 bg-EacColor-BlackPearl rounded-xl flex-row justify-self-center justify-center items-center "
            >
              <Text className=" px-3 text-xl font-bold text-center text-white font-Poppins">
                Login with Auth0
              </Text>
              <Image
                source={require("../../assets/images/auth0-logo.png")}
                className="  "
                style={{ width: 35, height: 35 }}
              />
              </TouchableOpacity>
              <View className='pt-24'>
                <Text className='text-justify'>
                  "I wanted to let you know that the program I've shared with you is part of our thesis project. It's a React Native application developed as part of our research. Your feedback on its functionality and usability would be greatly appreciated."
                </Text>
              </View>
            </View>
          </View>
          )
        }
      </View>
    </View>
  );
}
