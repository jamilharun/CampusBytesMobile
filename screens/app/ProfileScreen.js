import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Menu} from "react-native-feather";

export default function ProfileScreen() {
  const navigation = useNavigation();
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
    </SafeAreaView>
  )
}