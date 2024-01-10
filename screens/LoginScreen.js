import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "react-native-feather";
import { AuthContext } from "../context/AuthContext";
// import { text } from 'express';

export default function LoginScreen() {
  const [event, setEvent] = useState("login screen");

  const navigation = useNavigation();
  const { onLogin, isLoading } = useContext(AuthContext);

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
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8 "
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        {isLoading ? (
          <View className=" flex justify-center items-center">
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <View>
            <Text className="text-2xl pb-4 pt-60 ">Login</Text>

            {/* auth0 login */}
            <TouchableOpacity
              onPress={() => {
                toLogin();
              }}
              className=" py-3 bg-EacColor-BlackPearl rounded-xl flex-row justify-self-center justify-center items-center "
            >
              <Text className=" px-3 text-xl font-bold text-center text-white font-Poppins">
                Login with Auth0
              </Text>
              <Image
                source={require("../assets/images/auth0-logo.png")}
                className="  "
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>
          </View>
          )
        }
      </View>
    </View>
  );
}
