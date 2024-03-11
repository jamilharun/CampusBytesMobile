import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';
import { AntDesign, Entypo} from '@expo/vector-icons';
import { Image } from'react-native';
import ProfileScreen from '../screens/app/ProfileScreen';
import ShopStack from './shopStack';
import ClientStack from './ClientStack';

export default function AppStack() {
  const Drawer = createDrawerNavigator();


  
  // predefine data
  const user = {
    name: 'test',
    picture: 'https://i.pinimg.com/236x/e7/ed/0d/e7ed0d5d069eef78a5bcc21e77242e71.jpg',
    "https://myroles.com/roles": ["Admin"]
  }

  const debug = () => {
    user["https://myroles.com/roles"].map((role) => (
      console.log('role:', role)
    ))
  }
  debug();
  
  
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
      //this drawer will serve as shop screen
        name='Home' 
        options={{
          headerShown: false,
          drawerIcon: () => (
            <AntDesign name="home" size={24} color="black" />
          )
        }} 
        component={ClientStack} /> 

      {/* {
        user["https://myroles.com/roles"] && user["https://myroles.com/roles"].includes('admin') && (
          //preparational statement for admin
          )
      } */}

        <Drawer.Screen 
          name='YourShop' 
          options={{
            headerShown: false,
          drawerIcon: ()=> (
            <Entypo name="shop" size={24} color="black" />
          )}} 
          component={ShopStack} />
    </Drawer.Navigator>
  )
}