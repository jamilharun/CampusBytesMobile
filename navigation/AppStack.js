import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from "../screens/HomeScreen";
// import CartScreen from "../screens/CartScreen";
// import ShopScreen from "../screens/ShopScreen";
// import OrderPrepairingScreen from "../screens/OrderPrepairingScreen";


export default function AppStack() {
  const Stack = createNativeStackNavigator()
  

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
      <Stack.Screen name='Home' options={{headerShown: false}} component={HomeScreen} /> 
      {/* <Stack.Screen name='Shop' options={{headerShown: false}} component={ShopScreen} /> */}
      {/* <Stack.Screen name='Cart' options={{presetation:'modal', headerShown: false}} component={CartScreen} /> */}
      {/* <Stack.Screen name='OrderPrepairing' options={{presetation:'fullScreenModal', headerShown: false}} component={OrderPrepairingScreen} /> */}
    </Stack.Navigator>
  )
}