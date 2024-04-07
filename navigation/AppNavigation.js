import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export default function AppNavigation() {
  const { loggedIn, isLoading } = useContext(AuthContext);

  // test for debugging
  // const loggedIn = true;
  // const isLoading = false;

  // just turn true into false befor eas build
  const auth0isOn = loggedIn ? loggedIn : false
  if (isLoading) {
    return (
      <View className=" flex justify-center items-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (!auth0isOn)
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  // if (loggedIn) { alert(loggedIn)}

  return (
    <NavigationContainer>
      {auth0isOn == null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}
// no value
// loggedIn == null -> true
// loggedIn !== null => false

// has value
// loggedIn == null -> false
// loggedIn !== null -< true
