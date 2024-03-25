import { View, Text } from 'react-native'
import React from 'react'
import ShopScreen from '../screens/app/ShopScreen';
import CartScreen from '../screens/app/CartScreen';
import OrderScreen from '../screens/app/OrderScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/app/HomeScreen';
import PaymentScreen from '../screens/app/PaymentScreen';
import QueueDetails from '../screens/app/QueueDetails';

export default function ClientStack() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='home'
        >
            {/* initial page */}
            <Stack.Screen
                name='home'
                options={{ headerShown: false }}
                component={HomeScreen}
            />
            <Stack.Screen
                name='featured'
                options={{ headerShown: false }}
                component={ShopScreen}
            />
            {/* --------------------- */}
            <Stack.Screen
                name='Cart'
                options={{ headerShown: false }}
                component={CartScreen}
            />
            <Stack.Screen
                name='Pay'
                options={{ headerShown: false }}
                component={PaymentScreen}
            />

            <Stack.Screen
                name='Order'
                options={{ headerShown: false }}
                component={OrderScreen}
            />
            
            <Stack.Screen
                name='queueDetails'
                options={{ headerShown: false }}
                component={QueueDetails}
            />
            
            
        </Stack.Navigator>
  )
}