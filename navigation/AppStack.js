import React, { useContext } from 'react'
import HomeScreen from "../screens/app/HomeScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ShopsScreen from '../screens/app/ShopsScreen';
import { AuthContext } from '../context/AuthContext';
import { AntDesign, Entypo} from '@expo/vector-icons';
import { Image } from'react-native';
import ProfileScreen from '../screens/app/ProfileScreen';
import ShopScreen from '../screens/app/ShopScreen';

export default function AppStack() {
  const Drawer = createDrawerNavigator();

  // const { user } = useContext(AuthContext);

  // predefine data
  // const user = { name: 'test'};
  const user = {
    name: 'test',
    picture: 'https://i.pinimg.com/236x/e7/ed/0d/e7ed0d5d069eef78a5bcc21e77242e71.jpg'
  }
  
  console.log(user);

  return (
    <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
      <Drawer.Screen 
        name={user.name}
        options={{ 
          headerShown: false,
          // drawerLabel: 'Profile',
          // title:'Profile',
          drawerIcon: () => (
            <Image source={{ uri:  user?.picture }} style={{width: 40, height: 40, borderRadius: 100}}/>
          ),
          headerShown: false 
        }}
        component={ProfileScreen}
      />
      <Drawer.Screen 
        name='Home' 
        options={{
          headerShown: false,
          drawerIcon: () => (
            <AntDesign name="home" size={24} color="black" />
          )
        }} 
        component={HomeScreen} /> 

      <Drawer.Screen 
        name='Shops' 
        options={{
          headerShown: false,
        drawerIcon: ()=> (
          <Entypo name="shop" size={24} color="black" />
        )}} 
        component={ShopsScreen} />

      <Drawer.Screen 
        name='Shop' 
        options={{
          headerShown: false,
        drawerIcon: ()=> (
          <Entypo name="shop" size={24} color="black" />
        )}} 
        component={ShopScreen} />



    </Drawer.Navigator>
  )
}