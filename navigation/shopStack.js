import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ShopScreen from '../screens/app/ShopScreen';
import YourShop from '../screens/app/YourShop';
import EditGoods from '../screens/app/EditGoods';
import AddGoods from '../screens/app/AddGoods';
import ViewGoods from '../screens/app/ViewGoods';
import QueueListScreen from '../screens/app/QueueListScreen';
import EditDish from '../screens/app/EditDish';
import EditProducts from '../screens/app/EditProducts';

export default function ShopStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='yourShop'
        >
            <Stack.Screen
                name='yourShop'
                options={{ headerShown: false }}
                component={YourShop}
            />
            <Stack.Screen
                name='QueueList'
                options={{ headerShown: false }}
                component={QueueListScreen}
            />
            <Stack.Screen
                name='addGoods'
                options={{ headerShown: false }}
                component={AddGoods}
            />
             <Stack.Screen
                name='viewGoods'
                options={{ headerShown: false }}
                component={ViewGoods}
            />
            <Stack.Screen
                name='editGoods'
                options={{ headerShown: false }}
                component={EditGoods}
            />
            <Stack.Screen
                name='EditDish'
                options={{ headerShown: false }}
                component={EditDish}
            />
            <Stack.Screen
                name='EditProduct'
                options={{ headerShown: false }}
                component={EditProducts}
            />
        </Stack.Navigator>
  
    )
}