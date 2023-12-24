// import { useNavigation } from '@react-navigation/native';
import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  // const { onLogin } = useContext(AuthContext);

  const moveToLogin = (e) => {
    try {
      console.log(e + "you click move to Login");
      navigation.navigate("Login");
    } catch (err) {
      console.log(e + err);
    }
  };

  const inittialOP = () => {
    console.log("welcome to campusbytes");
  };
  inittialOP();

  return (
    <SafeAreaView className="flex-1 bg-EacColor-SelectiveYellow">
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white font-bold text-4xl text-center font-Poppins">
          Welcome to CanteenBytes!
        </Text>
        <View className="flex-row justify-center">
          {/* <Image 
             
            style={{width: 350, height: 350}}/>   */}
        </View>
        <View className=" space-y-4 ">
          <TouchableOpacity
            onPress={(e) => {
              moveToLogin(e);
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
