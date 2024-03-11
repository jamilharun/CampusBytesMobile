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
        <Image />
        {/* <Text>{user.sub}</Text>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text> */}
      </View>
    </SafeAreaView>
  )
}