import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Menu} from "react-native-feather";
import { AuthContext } from '../../context/AuthContext';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const { user } = useContext(AuthContext);
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
            source={{ uri: user.picture ? user.picture : "https://lh3.googleusercontent.com/a/ACg8ocKdr4jAE4jOVsBGUZukEUqK4Yd5E8A3svreYKbwT48f0W8=s96-c"}}
            className='rounded-full w-36 h-36'/>
        </View>
        <View className='flex justify-center items-center flex-col'>
            <Text className='text-xl'>{user.name ? user.name : 'test profile'}</Text>
            <Text className='text-xl'>id: {user.sub ? user.sub : '1234567890'}</Text>
          
        </View>
      </View>
    </SafeAreaView>
  )
}