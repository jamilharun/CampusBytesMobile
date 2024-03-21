import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';
import { AntDesign, Entypo} from '@expo/vector-icons';
import { Image } from'react-native';
import ProfileScreen from '../screens/app/ProfileScreen';
import ShopStack from './shopStack';
import ClientStack from './ClientStack';
import { toDatabase } from '../apis/server';

export default function AppStack() {
  const Drawer = createDrawerNavigator();

  // const { loggedIn, isLoading, user } = useContext(AuthContext);
  // if (user) {
  //   const saveUser = async() => {
  //      await toDatabase(user.email, 
  //                       user.family_name, 
  //                       user.given_name, 
  //                       user.nickname, 
  //                       user.name,
  //                       user.picture,
  //                       user.sub );
  //      console.log('okay inserted');
  //   }
  //   saveUser()
  // };


  
  // predefine data
  const user = {
    email: 'jamilharunl45@gmail.com',
    family_name: "Harun",
    given_name: "jamil",
    nickname: "jamilharunl45",
    name: 'Jamil Harun',
    picture: "https://lh3.googleusercontent.com/a/ACg8ocKdr4jAE4jOVsBGUZukEUqK4Yd5E8A3svreYKbwT48f0W8=s96-c",
    sub: "google-oauth2|103360425900701922708",
    "https://myroles.com/roles": ["shopOwner"]
  }
  
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

      {
        user["https://myroles.com/roles"] && 
        user["https://myroles.com/roles"].includes('shopOwner') && (
          //preparational statement for admin
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

    </Drawer.Navigator>
  )
}