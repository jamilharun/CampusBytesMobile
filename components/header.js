import { View, TextInput, TouchableOpacity, Text, Modal } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Map, Menu, Search, Sliders } from "react-native-feather";
import React, { useContext, useEffect, useState } from 'react'
import { getMyQueue } from "../apis/server";
import { AuthContext } from "../context/AuthContext";
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { changeFilterAmount, selectFilterAmount, setAmount, setFilterAmount } from "../slices/FilterSlice";

export default function Header() {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const setedFilterAmount = useSelector(selectFilterAmount)
    const dispatch = useDispatch()

    const [userQueue, setUserQueue] = useState(null)
    const [openFilter, setOpenFilter] = useState(false)
    const [filterAmount, setFilterAmount] = useState(setedFilterAmount)
    // const [waitTime, setwaitTime] = useState(1000)
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

    
    
    useEffect(() => {
      const waitTime = 2 * 60 * 1000;
      const fetchData = async () => {
        const response = await getMyQueue(userData.sub)
        console.log('sdfsdfsdf: ', response);
        setUserQueue(response);
        // if (!response) {
        //   waitTime = 60 * 60 * 1000;
        //   console.log('response none ', waitTime);
        //   // setwaitTime(time)
        //   setUserQueue(response)
        // } else {
        //   waitTime = response[0].index >= 20 ? 3 * 600 * 1000 : 600 * 1000;
        //   console.log('response ', waitTime);
        //   // setwaitTime(time)
        //   setUserQueue(response);
        // }        
      };
      console.log(waitTime);
      const intervalId = setInterval(fetchData, waitTime); // Refetch every 5 seconds
      return () => clearInterval(intervalId); // Cleanup function to stop interval on unmount
    }, []); // Empty dependency array ensures effect runs only once after mount
    
    const handleFilterAmount = (newAmount) => {
      dispatch(setAmount(newAmount))
    };


    return (
        <View className="flex-row items-center space-x-2 px-4 ">
            <TouchableOpacity 
              onPress={()=>{
                navigation.dispatch(DrawerActions.openDrawer())
              }}
              className=" bg-EacColor-TahitiGold p-3 rounded-full">
                <Menu height="20" width="20" strokeWidth={2.5} stroke="white" />
            </TouchableOpacity>
            <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
            {
            userQueue ? 
            <View className=' bg-EacColor-SelectiveYellow rounded-full w-full flex flex-row justify-center items-center z-20'>
                  <View className='w-full flex flex-col justify-center items-center'>
                  {
                    userQueue ? (
                      <TouchableOpacity 
                      className=' w-3/4 rounded-md flex flex-row justify-between items-center'
                      onPress={()=>{navigation.navigate('queueDetails', {userQueue})}}>
                        <View className=" w-10 h-10  flex justify-center items-center">
                          <Text className='text-EacColor-BlackPearl text-2xl'>{userQueue[0].index}</Text>
                        </View>
                        <View className='flex flex-row justify-center items-center'>
                          <Text className='text-EacColor-BlackPearl text-lg'>id:</Text>
                          <View >
                            <Text className='text-2xl'>{userQueue[0].data}</Text>
                          </View>
                        </View>
                        <View>
                          <Text className='text-EacColor-BlackPearl text-2xl'>{userQueue.length}</Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <View>
                      </View>
                    )
                  }
                  </View>
            </View> : 
            <View className=' w-full flex flex-row justify-center items-center'>
              <Text className='text-center text-xl'>CampusBytes</Text>
            </View>
          }
            </View>
            <TouchableOpacity 
            onPress={()=>{setOpenFilter(true)}}
            className=" bg-EacColor-TahitiGold p-3 rounded-full">
                <Sliders height="20" width="20" strokeWidth={2.5} stroke="white" />                
            </TouchableOpacity>
            <Modal
              visible={openFilter}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setOpenFilter(false)}>
              <View
                style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                activeOpacity={1}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                  {/* Your filter content goes here */}
                  <View className='flex flex-row justify-between items-center'>
                    <Text>Filter Option</Text>
                    <AntDesign name="close" size={24} color="black" onPress={() => setOpenFilter(false)} />
                  </View>
                  <Text>Amount: </Text>
                  <TextInput
                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, paddingLeft: 10, paddingVertical: 8, marginBottom: 10 }}
                    value={filterAmount ? filterAmount.toString() : ''} // Check if filterAmount is defined
                    onChangeText={setFilterAmount}
                    keyboardType="numeric"
                    placeholder="Enter amount"
                  />
                  <Text>this function will filter available items in the menu to a value not greater than "setAmount"</Text>
                  <TouchableOpacity 
                    style={{ backgroundColor: '#FFD700', marginTop: 10, padding: 10, borderRadius: 5 }}
                    onPress={() => {
                      setOpenFilter(false);
                      handleFilterAmount(filterAmount)
                    }}>
                    <Text style={{ textAlign: 'center' }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
        </View>
    )
}