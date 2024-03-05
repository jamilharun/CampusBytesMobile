import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {View, Image, TouchableOpacity } from 'react-native';

export default function OrderPrepairingScreen() {
  const navigation = useNavigation();
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('Prepairing')
    }, 3000)
  })
  return (
    <View className=' flex-1 bg-white justify-center items-center'>
      <Image source={require()} className=' h-80 w-80'/>
    </View>
  )
}
