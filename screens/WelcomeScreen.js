
// import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { AuthContext } from '../context/AuthContext';


export default function WelcomeScreen({navigation}) {
  // const navigation = useNavigation();

  const { onLogin } = useContext(AuthContext)

  const moveToLogin = () => {
    try {
      alert('you click move to Login')
      navigation.navigate('Login')
    } catch (error) { 
      alert(error)
    }
  }

  const toLogin = () => {
    try {
      alert('logging in')
      onLogin
    } catch (error) {
      alert(error)
    }
  }
  
  return (
    <SafeAreaView className="flex-1 bg-EacColor-SelectiveYellow"> 
      <View className='flex-1 flex justify-around my-4'>
        <Text className='text-white font-bold text-4xl text-center font-Poppins'>
          Welcome to CanteenBytes!
        </Text>
        <View className='flex-row justify-center'>
          {/* <Image 
             
            style={{width: 350, height: 350}}/>   */}
        </View>
        <View className=' space-y-4 '>
          
          <TouchableOpacity
            onPress={()=> {moveToLogin()}}
            className='py-3 mx-20  bg-EacColor-DeepFir rounded-2xl'>
            <Text className='text-xl font-bold text-center text-white font-Poppins'>
              Let's Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=> {toLogin()}}
            className=' py-3 bg-EacColor-BlackPearl rounded-xl flex-row justify-self-center justify-center items-center '>
            <Text className=' px-3 text-xl font-bold text-center text-white font-Poppins'>
              testing Login with Auth0 
            </Text>
            <Image 
              source={require("../assets/images/auth0-logo.png")}
              className='  '
              style={{width:35, height: 35}}/> 
                
            </TouchableOpacity>

          {/* <View className='flex-row justify-center '>
            <Text className='flex-row justify-center font-Poppins'>you dont have a account?</Text>
            
            <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                <Text className='font-semibold text-EacColor-SelectiveYellow font-Poppins'>Sign Up</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  )
}
