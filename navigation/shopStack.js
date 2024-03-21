import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import YourShop from '../screens/app/YourShop';
import AddGoods from '../screens/app/AddGoods';
import ViewGoods from '../screens/app/ViewGoods';
import QueueListScreen from '../screens/app/QueueListScreen';
import EditDish from '../screens/app/EditDish';
import EditProducts from '../screens/app/EditProducts';
import QueueDetails from '../screens/app/QueueDetails';

export default function ShopStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='yourShop'
        >
            {/* initial page */}
            <Stack.Screen
                name='yourShop'
                options={{ headerShown: false }}
                component={YourShop}
            />
            {/* --------------------- */}
            <Stack.Screen
                name='ViewMenu'
                options={{ headerShown: false }}
                component={ViewGoods}
            />

            <Stack.Screen
                name='QueueList'
                options={{ headerShown: false }}
                component={QueueListScreen}
            />

            {/* ------------------------- */}
            <Stack.Screen
                name='QueueDetails'
                options={{ headerShown: false }}
                component={QueueDetails}
            />
            
            
            {/* <Stack.Screen
                name='addGoods'
                options={{ headerShown: false }}
                component={AddGoods}
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
            /> */}
        </Stack.Navigator>
  
    )
}