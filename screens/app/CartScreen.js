import React, { useContext, useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native'
import { Image, Modal, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from '../../slices/ShopSlice';
// import { removefromCart, selectCartItems, selectCarttotal } from '../../slices/CartSlice';
import { Minus, Plus } from 'react-native-feather'
import { removefromCart, selectCartItems, selectCartItemsById, selectCarttotal } from '../../slices/CartSlice';
import { ChevronLeft, MapPin } from 'react-native-feather';
import { urlFor } from '../../apis/sanity';
import { AuthContext } from '../../context/AuthContext';
import { checkPaySuccess, createCustomOrder, initializePay, newOrder } from '../../apis/server';
import { AntDesign } from '@expo/vector-icons';

export default function CartScreen({route, navigation}) {
    
    const [refNo, setRefNo] = useState('')
    const { user } = useContext(AuthContext);
    const shop = useSelector(selectShop)
    const [randomNum, setRandomNum] = useState(null);
    //service tax = dafault 0
    const [deliveryFee, setDeliveryFee] = useState(null)
    const [location, setLocation] = useState("")
    // const [special, isSpecial] = useState(false)
    // isCancelled = default 0
    // isFinished = default 0

    //total amount
    const cartItems = useSelector(selectCartItems) //itemRef quantity price 
    //created_at

    const carttotal = useSelector(selectCarttotal)
    const [delivery, setDelivery] = useState(null)
    const [groupedItems, setGroupedItems] = useState({})
    const dispatch = useDispatch()
    const [openFilter, setOpenFilter] = useState(false)
    const [viewQR, setViewQR] = useState(false)    
    if (cartItems.length === 0) {navigation.goBack()}

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

    const checkout = async () => {
        console.log('sending data to server to be processed');
        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        const created_at = new Date().toISOString().replace('T', ' ').replace('Z', '');
        const totalAmount = carttotal + deliveryFee // idunno
        let isSpecial = false
        if (userData["https://myroles.com/roles"] && 
            userData["https://myroles.com/roles"]?.includes('Special')) {
            isSpecial = true
        }
        console.log(isSpecial);
        try {
            const newOrder = await createCustomOrder(refNo, userData.sub, shop.id, randomNumber, deliveryFee, totalAmount, location, isSpecial, created_at, groupedItems)
            if (newOrder) {
                console.log('createCustomOrder works');
                // console.log(result);
                if (newOrder) {
                    navigation.navigate('Order', {newOrder})
                }
            }
            else {console.log('createCustomOrder did not work');}

        } catch (error) {
            
        }
    }

    useEffect(()=>{
        const items = cartItems.reduce((group, item)=>{
            if (group[item._id]) {
                group[item._id].push(item)
            } else (group[item._id] = [item]) 
            return group;
        },{})
        setGroupedItems(items)
    
        if (delivery) {
            setDeliveryFee(20)
        } else {
            setDeliveryFee(0)
        }
    },[cartItems])

    return (
    <View className=' bg-white flex-1'>
        {/* back button */}
        <View className=' relative py-4 shadow-sm'>
            <View className=''>
                <TouchableOpacity 
                    onPress={()=>{navigation.goBack()}}
                    className="TahitiGold pl-3 rounded-full absolute z-50">
                    <ChevronLeft
                    className="text-EacColor-BlackPearl"
                    style={{ width: 28, height: 28 }}/>
                </TouchableOpacity>
                <Text className=' text-center font-bold text-xl'>Your Cart</Text>
                {/* <Text className=' text-center text-gray-500'>{shop.name   }</Text> */}
            </View>
        </View>
        {/* Pick Up only */}
        {/* <View className=' opacity-50 bg-EacColor-SelectiveYellow flex-row px-4 items-center'>
            <Image source={} className=' w-20 h-20 rounded-full'/>
        </View> */}
        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom:50
            }}
            className=' bg-white pt-5'>
            <View 
                style={{borderTopLeftRadius:40, borderTopRightRadius: 40}}
                className=' bg-white '>
                <View>
                    <Image className='h-32 w-full object-cover rounded-xl mt-1' source={{ uri: urlFor(shop?.cover).url()}}/>
                </View>
                <View className='flex flex-row mx-3 '>
                    {/* <Image 
                        className='h-32 w-24 object-cover rounded-xl mt-1' 
                        source={{ uri: urlFor(shop?.logo).url()}}/> */}
                    <View className=' px-5'>
                        <Text className=' text-3xl font-bold'>{shop?.shopName}</Text>
                        <View className=' flex-row space-x-2 my-1'>
                            <View className=' flex-row items-center space-x-1'>
                                <Text className=' text-xs'>
                                    <Text className=' text-EacColor-SelectiveYellow'>rating</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {
            Object.entries(groupedItems).map(([key, items])=>{
            let dish = items[0]
            // const totalItems = useSelector(state=> selectCartItemsById(state, item._id));
            console.log(dish.name, '|', items.length);
            // console.log(items);
            return(
            <View key={key}
                className=' flex-row items-center space-x-3 py-4 bg-white rounded-3xl mx-2 mb-3 shadow-md '>
                <Text className=' font-bold text-EacColor-SelectiveYellow'>{items.lenth}</Text>
                <Image className=' h-14 w-14 rounded-full ' source={{uri: urlFor(dish.image).url()}}/>
                <Text className=' flex-1 font-bold text-gray-700'>{dish.name}</Text>
                <View>
                    <Text className=' font-semibold text-base'>₱{dish.price}</Text>
                    <Text className=' font-semibold text-base'>qty: {items.length}</Text>
                    <Text className=' font-semibold text-base'>₱{dish.price * items.length}</Text>
                </View>
                <TouchableOpacity 
                    onPress={()=> dispatch(removefromCart({_id: dish._id}))}
                    className=' p-1 rounded-full bg-EacColor-SelectiveYellow'>
                        <Minus className=' bg-EacColor-TahitiGold rounded-full' strokeWidth={2} height={20} width={20} stroke={'white'}/>
                </TouchableOpacity>
            </View>
            )
            })
            }
        </ScrollView>
        {/* totals */}
        
        <View className=' bg-EacColor-TahitiGold opacity-50 p-6 px-8 rounded-t-3xl space-y-4'>
            {/* <View className=' flex-row justify-between'>
                <Text className=' text-EacColor-BlackPearl'>Subtotal</Text>
                <Text className=' text-EacColor-BlackPearl'>{carttotal}</Text>
            </View> */}
            {/* <View className=' flex-row justify-between'>
                <Text className=' text-EacColor-BlackPearl'>Order fee</Text>
                <Text className=' text-EacColor-BlackPearl'>?</Text>
            </View> */}
            <View className=' flex-row justify-between'>
                <Text className=' text-EacColor-BlackPearl font-black'>total</Text>
                <Text className=' text-EacColor-BlackPearl font-extrabold'>{carttotal}</Text>
            </View>
            <View>
                <TouchableOpacity 
                    onPress={()=>{setOpenFilter(true)}}
                    className=' bg-EacColor-DeepFir p-3 rounded-full'>
                    <Text className=' text-white text-center font-bold text-lg'> Next Step</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Modal
            visible={openFilter}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setOpenFilter(false)}>
            <View
              style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              activeOpacity={1}>
              <View style={{ backgroundColor: 'white', padding: 20 }}>
                <View className='flex flex-row justify-between items-center'>
                  <Text>next step</Text>
                  <AntDesign name="close" size={24} color="black" onPress={() => setOpenFilter(false)} />
                </View>
                <Text>Account no.</Text>
                <Text>09123456789</Text>
                {
                userData["https://myroles.com/roles"] && 
                userData["https://myroles.com/roles"]?.includes('Special') &&        
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Switch
                      value={delivery == true}
                      onValueChange={() => delivery ? setDelivery(false) : setDelivery(true)}
                  />
                  <Text style={{ marginLeft: 10 }}>delivery</Text>
                </View>
                }
                {
                delivery && <View className='mb-4'>
                  <Text className=' text-EacColor-BlackPearl'>Location</Text>
                  <TextInput
                    className=' border border-gray-300 rounded-md pl-2 py-2'
                    value={location}
                    onChangeText={setLocation}
                    keyboardType='default' 
                    />
                    <Text>Note: switching on delivery may charge you 20 pesos<Text>Scan QR using gcash scanner</Text></Text>
                </View>
                }
                <View className='flex flex-row justify-between items-center'>
                    <Text>insert Your Ref no.</Text>
                    <TouchableOpacity onPress={()=>setViewQR(true)}><Text className='text-babyBlue'>get Ref no.</Text></TouchableOpacity>
                </View>
                <TextInput
                    className=' border border-gray-300 rounded-md pl-2 py-2'
                    value={refNo}
                    onChangeText={setRefNo}
                    keyboardType='default'                     
                    />
                <Text>
                    to get your reference number. you must pay "cash transfer" the shop first with the amount 
                    equal to what you have selected in yuor cart. then on your "cash transfer" reciept, inside 
                    it theres the ref.no. just Copy Paste it to the ref no text box
                </Text>
                <TouchableOpacity 
                  style={{ backgroundColor: '#FFD700', marginTop: 10, padding: 10, borderRadius: 5 }}
                  onPress={() => {
                    setOpenFilter(false);
                    checkout()
                  }}>
                <Text style={{ textAlign: 'center' }}>checkout</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
        <Modal
            visible={viewQR}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setViewQR(false)}>
            <View
              style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              activeOpacity={1}>
              <View style={{ backgroundColor: 'white', padding: 20 }}>
                {/* Your filter content goes here */}
                <View className='flex flex-row justify-between items-center'>
                  <Text>View QR </Text>
                  <AntDesign name="close" size={24} color="black" onPress={() => setViewQR(false)} />
                </View>
                
                
                <Text>Scan QR using gcash scanner</Text>
                {
                    shop.qrcode ? <View className='flex justify-center items-center'>
                    <Image source={{ uri: urlFor(shop?.qrcode).url()}} style={{width: 300, height: 300}} />
                    </View> : 
                    <View className='flex justify-center items-center'>
                        <Image source={require('../../assets/images/No-Image.png')}  style={{width: 300, height: 300}} />
                    </View>
                }
                <Text>
                    use your Gcash QR scan to the QRcode. other QR scanner may not work properly.
                    it is best to use the official QR scanner for this one.
                </Text>
                <TouchableOpacity 
                  style={{ backgroundColor: '#FFD700', marginTop: 10, padding: 10, borderRadius: 5 }}
                  onPress={() => {setViewQR(false)}}>
                <Text style={{ textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
    </View>
  )
}
