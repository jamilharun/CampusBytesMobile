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
                className="TahitiGold p-3 rounded-full">
                  <Menu 
                    height="20" 
                    width="20" 
                    strokeWidth={2.5} 
                    className="text-EacColor-TahitiGold"/>
        </TouchableOpacity>
      </View>
      <View>
        <Image source={{uri: user.picture}} 
          style={{width: 100, 
                  height: 100, 
                  borderRadius: 50}}/>
        <Text>{user.sub}</Text>
        <Text>{user.given_name}</Text>
        <Text>{user.family_name}</Text>
        <Text>{user.nickname}</Text>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        <Text>Roles</Text>
        {
          user["https://myroles.com/roles"].map((role, index) => (
            <Text key={index}>{role}</Text>
          ))
        }
      </View>
    </SafeAreaView>
  )
}