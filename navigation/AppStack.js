import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from "../screens/app/HomeScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ShopScreen from '../screens/app/ShopScreen';
// import CartScreen from "../screens/CartScreen";
// import ShopScreen from "../screens/ShopScreen";
// import OrderPrepairingScreen from "../screens/OrderPrepairingScreen";


export default function AppStack() {
  // const Stack = createNativeStackNavigator()
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
      <Drawer.Screen 
        name='Home' 
        options={{headerShown: false}} 
        component={HomeScreen} /> 
      <Drawer.Screen 
        name='Shop' 
        options={{headerShown: false}} 
        component={ShopScreen} />
      {/* <Stack.Screen name='Cart' options={{presetation:'modal', headerShown: false}} component={CartScreen} /> */}
      {/* <Stack.Screen name='OrderPrepairing' options={{presetation:'fullScreenModal', headerShown: false}} component={OrderPrepairingScreen} /> */}
    </Drawer.Navigator>
  )
}