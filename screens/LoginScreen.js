import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "react-native-feather";
import { AuthContext } from "../context/AuthContext";
// import { text } from 'express';

export default function LoginScreen() {
  const [event, setEvent] = useState("login screen");

  const navigation = useNavigation();
  const { onLogin } = useContext(AuthContext);

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
        <Text className="text-2xl pb-4 pt-60 ">Login</Text>
        {/* <View className='form space-y-2'>
              <Text className='text-EacColor-BlackPearl ml-4'>User Name</Text>
              <TextInput
                className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3'
                placeholder='Example123@example.com'
                keyboardType='email-address'
                value={email}
                onChangeText={text => setEmail(text)}/>

              <Text className='text-EacColor-BlackPearl ml-4'>Password</Text>
              <TextInput
                className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3'
                secureTextEntry
                placeholder='Enter Password'
                value={password}
                onChangeText={text => setPassword(text)}/>
              
              <TouchableOpacity className='flex items-end mb-5'>
                <Text className='text-EacColor-BlackPearl'>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                
                onPress={()=>{login(email, password)}}
                className='py-3 bg-EacColor-SelectiveYellow rounded-xl'>
                <Text className='font-xl font-bold text-center text-EacColor-BlackPearl'>Login</Text>
              </TouchableOpacity>
            </View> */}

        {/* auth0 login */}

        <View></View>

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
    </View>
  );
}
