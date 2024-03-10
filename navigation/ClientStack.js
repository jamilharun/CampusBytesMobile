import { View, Text } from 'react-native'
import React from 'react'
import ShopScreen from '../screens/app/ShopScreen';
import CartScreen from '../screens/app/CartScreen';
import OrderScreen from '../screens/app/OrderScreen';

export default function ClientStack() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='featured'
        >
            {/* initial page */}
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
                name='Order'
                options={{ headerShown: false }}
                component={OrderScreen}
            />
            
        </Stack.Navigator>
  )
}