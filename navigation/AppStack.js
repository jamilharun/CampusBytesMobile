import React, { useContext, useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';
import { AntDesign, Entypo} from '@expo/vector-icons';
import { Image } from'react-native';
import ProfileScreen from '../screens/app/ProfileScreen';
import ShopStack from './shopStack';
import ClientStack from './ClientStack';
import { toDatabase } from '../apis/server';
import Survey from '../screens/app/Survey';

export default function AppStack() {
  const Drawer = createDrawerNavigator();

  const { loggedIn, isLoading, user } = useContext(AuthContext);
  
  useEffect(()=>{
    if (user || loggedIn) {
      try {
        toDatabase(user?.email, user?.family_name, user?.given_name, user?.nickname, user?.name, user?.picture, user?.sub );
      } catch (error) {
        console.log('connection error: ',error);
      }
    }
  },[user])

  const userData = user ? user : {
    email: 'TestUser@email.com',
    family_name: "ForDubbing",
    given_name: "User123",
    nickname: "sample user",
    name: 'user123',
    picture: "https://i.ytimg.com/vi/BEZmXjh8l0M/hq720_2.jpg?sqp=-oaymwEYCIACEOADSFryq4qpAwoIARUAAIhC0AEB&rs=AOn4CLDg2TpFauEmoM4VAD2gaMR_nJwSTQ",
    sub: "user.sub",
    "https://myroles.com/roles": ["shopOwner", "Special", "Admin", "Client"]
  }
  // predefine data
  // const user = {
  // }
  
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
      <Drawer.Screen 
        name={userData.name}
        options={{ 
          headerShown: false,
          // drawerLabel: 'Profile',
          // title:'Profile',
          drawerIcon: () => (
            <Image source={{ uri: userData.picture }} style={{width: 40, height: 40, borderRadius: 100}}/>
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

      {
        userData["https://myroles.com/roles"] && 
        userData["https://myroles.com/roles"]?.includes('shopOwner') && (
          // preparational statement for admin
          <Drawer.Screen 
            name='YourShop' 
            options={{
              headerShown: false,
            drawerIcon: ()=> (
              <Entypo name="shop" size={24} color="black" />
            )}} 
            component={ShopStack} />
          
          )
      }

      <Drawer.Screen 
      //this drawer will serve as shop screen
        name='Survey' 
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Entypo name="text-document" size={24} color="black" />
          )
        }} 
        component={Survey} /> 


    </Drawer.Navigator>
  )
}