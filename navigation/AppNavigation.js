import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export default function AppNavigation() {
  // const { loggedIn, isLoading } = useContext(AuthContext);

  // test for debugging
  const loggedIn = true;
  const isLoading = false;

  if (isLoading) {
    return (
      <View className=" flex justify-center items-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (!loggedIn)
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  // if (loggedIn) { alert(loggedIn)}

  return (
    <NavigationContainer>
      {loggedIn == null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}
// no value
// loggedIn == null -> true
// loggedIn !== null => false

// has value
// loggedIn == null -> false
// loggedIn !== null -< true
