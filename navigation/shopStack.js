// import { View, Text } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import ShopScreen from '../screens/app/ShopScreen';

// export default function ShopStack({_id, _type}) {
//     const Stack = createNativeStackNavigator();

//     return (
    
//         <NavigationContainer>
//             <Stack.Navigator
                
//                 screenOptions={{ headerShown: false }}
//                 initialRouteName='Shop'
//             >
//                 <Stack.Screen
//                     name='Shop'
//                     options={{ headerShown: false }}
//                     component={ShopScreen}
//                 />
//                 {/* <Stack.Screen
//                     name='Shop'
//                     options={{ headerShown: false }}
//                     component={() => <ShopScreen dishId={dishId} shop={shop} />}
//                 /> */}
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }