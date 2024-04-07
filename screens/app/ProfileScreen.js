import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Menu} from "react-native-feather";
import { AuthContext } from '../../context/AuthContext';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const { user, onLogout } = useContext(AuthContext);

  const userData = user ? user : {
    email: 'TestUser@email.com',
    family_name: "ForDubbing",
    given_name: "User123",
    nickname: "sample user",
    name: 'user123',
    picture: "https://lh3.googleusercontent.com/a/ACg8ocKdr4jAE4jOVsBGUZukEUqK4Yd5E8A3svreYKbwT48f0W8=s96-c",
    sub: "google-oauth2|103360425900701922708",
    "https://myroles.com/roles": ["shopOwner", "Special", "Admin", "Client"]
  }

  const toLogout = () => {
    try {
      onLogout()
      // navigation.navigate('Login')
    } catch (error) {
      console.log('logging out');
    }
  }
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity 
                onPress={()=>{
                  navigation.dispatch(DrawerActions.openDrawer())
                }}
                className="TahitiGold p-3 rounded-full absolute z-40">
                  <Menu 
                    height="20" 
                    width="20" 
                    strokeWidth={2.5} 
                    className="text-EacColor-TahitiGold"/>
        </TouchableOpacity>
      </View>
      <View>
        
        <View className='w-full h-44 flex justify-end items-center bg-gray-200'>
          <Image 
            source={{ uri: userData.picture }}
            className='rounded-full w-36 h-36'/>
        </View>
        <View className='flex justify-center items-center flex-col'>
            <Text className='text-xl'>{userData.name}</Text>
            <Text className='text-xl'>id: {userData.sub}</Text>
          
        </View>
        <View className='flex justify-center items-center flex-col h-40 '>
          <TouchableOpacity 
            onPress={()=>{toLogout()}}
            className='bg-EacColor-RedOxide p-3 rounded-full'>
            <Text className='text-2xl text-white'>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}