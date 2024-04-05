import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronLeft } from 'react-native-feather';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { openURL, Linking } from 'expo-linking';

export default function Survey() {
    const navigation = useNavigation();
    
    const openingURL = () => {
        try {
            const url = 'https://docs.google.com/forms/d/e/1FAIpQLSfFDtp8p0sGYUADjH5_jrTh6URxlde5vTuFr4LvLZAUWDsFJw/viewform?usp=sharing';
            console.log('link', url);
            openURL(url);
        } catch (error) {
            console.log('link undefined');      
        }
    }
  return (
    <View>
        <View className=' relative py-6 shadow-sm'>
            <View className=''>
                <TouchableOpacity 
                    onPress={()=>{navigation.dispatch(DrawerActions.openDrawer())}}
                    className="TahitiGold pl-3 rounded-full absolute z-50">
                    <ChevronLeft
                    className="text-EacColor-BlackPearl"
                    style={{ width: 28, height: 28 }}/>
                </TouchableOpacity>
                <Text className=' text-center font-bold text-xl'>Survey</Text>
                {/* <Text className=' text-center text-gray-500'>{shop.name   }</Text> */}
            </View>
        </View>
        <View className='mx-4'>
            <Text>just click the link and it will redirect you.</Text>
            <TouchableOpacity
                onPress={()=>{openingURL()}}
                className='my-4'>
                <Text className='text-2xl'>Google Forms</Text>
                <View>
                    <Text>https://docs.google.com/forms/d/e/1FAIpQLSfFDtp8p0sGYUADjH5_jrTh6URxlde5vTuFr4LvLZAUWDsFJw/viewform?usp=sharing</Text>
                </View>
            </TouchableOpacity>

        </View>
    </View>
  )
}