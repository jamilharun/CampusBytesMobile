import React from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";


export default function AuthStack() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Welcome'>
        <Stack.Screen name='Welcome' options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name='Login' options={{headerShown: false}} component={LoginScreen} />
        {/* <Stack.Screen name='SignUp' options={{headerShown: false}} component={SignUpScreen} /> */}
    </Stack.Navigator>
  )
}