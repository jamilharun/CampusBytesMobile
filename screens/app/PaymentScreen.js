import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { ChevronLeft, MapPin } from 'react-native-feather';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from '../../slices/ShopSlice';
import { emptyCart, selectCartItems, selectCarttotal } from '../../slices/CartSlice';
import { checkPaySuccess, initializePay, newOrder } from '../../apis/server';
import { openURL, Linking } from 'expo-linking';

export default function PaymentScreen({ route, navigation }) {
  // const { groupedItems } = route.params;
  const dispatch = useDispatch();

  const { user } = useContext(AuthContext);
  const shop = useSelector(selectShop);
  const cartItems = useSelector(selectCartItems);
  const carttotal = useSelector(selectCarttotal);
  const [groupedItems, setGroupedItems] = useState({})

  const [randomNum, setRandomNum] = useState(null);
  const [delivery, setDelivery] = useState(null)
  const [deliveryFee, setDeliveryFee] = useState(null)
  const [vatRate, getVatRate] = useState(null)
  const [serviceFee, setServiceFee] = useState(null); // Assuming serviceFee is used later
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [name, setName] = useState(null); // State for name
  const [phoneNumber, setPhoneNumber] = useState(null); // State for phone number
  const [email, setEmail] = useState(null); // State for email
  const [placeOrderReady, setPlaseOrderReady] = useState(null)
  const [totalAmount, getTotalAmount] = useState(null)
  const [location, setLocation] = useState("")
  const [special, isSpecial] = useState(false)

  const [paymentInfo, getPaymentInfo] = useState(null)
  const [paymentInt, getPaymentInt] = useState(null)
  const [next_action, getNext_Action] = useState(null)

  const [loading, setLoading] = useState(null)
  const [allProcessSuccess, setAllProcessSuccess] = useState(null)
  
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [fetching, setFetching] = useState(false);
  useEffect(()=>{

    const items = cartItems.reduce((group, item)=>{
        if (group[item._id]) {
            group[item._id].push(item)
        } else (
            group[item._id] = [item]
        ) 
        return group;
    },{})
    setGroupedItems(items)

    if (user["https://myroles.com/roles"] && 
        user["https://myroles.com/roles"]?.includes('Special')) {
        console.log('has special');
        isSpecial(true)
    }
},[cartItems])


  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    setRandomNum(randomNumber);
  
    const feeAmount = vatRate * carttotal;
    console.log(feeAmount);
    setServiceFee(feeAmount)
  }, [vatRate]); // Empty dependency array for one-time generation

  useEffect(()=>{
    if (delivery) {
      setDeliveryFee(20)
    } else {
      setDeliveryFee(0)
    }
  },[delivery])

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    if (method == 'paymaya') {
      getVatRate(0.020)
    } else if (method == 'gcash') {
      getVatRate(0.025)
    } else if (method == 'grab_pay') {
      getVatRate(0.022)
    } else {
        console.log('no payment method selected');
        getVatRate(0)
    }
  };
  useEffect(()=>{
    if (name &&
        email &&
        phoneNumber &&
        selectedPaymentMethod) {setPlaseOrderReady(true)}
      
        console.log('\nto initializePay');
        console.log(shop.id, totalAmount, name, email, phoneNumber, selectedPaymentMethod);
      
        // console.log('\nto initializeOrder');
        // console.log('paymentRef', 'user.sub', shop.id, randomNum, groupedItems, serviceFee, deliveryFee, totalAmount, special, 'created_at');

        const totals = !delivery ? carttotal + (vatRate * carttotal) : carttotal + deliveryFee + (vatRate * carttotal)
      // console.log(totals);
      getTotalAmount(totals)
  },[name, email, phoneNumber, selectedPaymentMethod, delivery])
  
  useEffect(()=>{
    try {
      const url = next_action.url;
      console.log('link', url);
      openURL(url);
    } catch (error) {
      console.log('link undefined');
      
    }
  },[next_action])
  
  const paymongoInstance = async (created_at) => {
    try {
      // useEffect(async() => {
        // if (!paymentUrl && !fetching) {
          console.log('getting payInt payMet atPaIn data ');
          // setFetching(true);
          const result = await initializePay(shop.id, totalAmount, name, email, phoneNumber, selectedPaymentMethod, created_at);
          // setFetching(false);
          getPaymentInfo(result.data.result)
          getPaymentInt(result.data.createPayIntent.data.id)
          getNext_Action(result.data.attachPayIntent.data.attributes.next_action.redirect)
          // console.log(result);
        // }
      // });
    
    } catch (error) {
      console.log('error in paymongo instance', error);
    }
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    const created_at = new Date().toISOString().replace('T', ' ').replace('Z', '');
    console.log(created_at);

    
    try {
      
      await paymongoInstance(created_at)

      useEffect(async()=>{
        console.log(paymentInfo);
        const isSuccess = await checkPaySuccess(paymentInfo.paymentid)

        if (isSuccess) {
          // console.log(paymentInfo);
          // console.log('\n',paymentInt, 'user.sub', shop.id, randomNum, groupedItems, serviceFee, deliveryFee, totalAmount, special, created_at);
          const checkingout = await newOrder( paymentInfo.paymentid, 'user.sub', shop.id, randomNum, groupedItems, 
                                              serviceFee, deliveryFee, totalAmount, special, created_at,
                                              location)
          if (checkingout) {
            //all processes successful
            dispatch(emptyCart())
            setAllProcessSuccess(true)
            setLoading(false)
          } else {
            setLoading(false)
          }
          console.log('checkout: ', checkingout)
          navigation.navigate('Order')
        }
      },[paymentInfo])
      
  } catch (error) {
      console.error('Error processing payment:', error);
      // Handle general errors
      setLoading(false)
    }
  };


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
        <Text className=' text-center font-bold text-xl'>Choose Payment</Text>
        {/* <Text className=' text-center text-gray-500'>{shop.name   }</Text> */}
    </View>
</View>
{/* Pick Up only */}
{/* <View className=' opacity-50 bg-EacColor-SelectiveYellow flex-row px-4 items-center'>
    <Image source={} className=' w-20 h-20 rounded-full'/>
</View> */}
<ScrollView 
            style={{ marginTop: 20, marginHorizontal: 10 }}>

<Text>Please fill up your information below:</Text>
        <View className='mb-4'>
          <Text className=' text-EacColor-BlackPearl'>Name</Text>
          <TextInput
            className=' border border-gray-300 rounded-md pl-2 py-2'
            value={name}
            onChangeText={setName}
          />
        </View>
        <View className='mb-4'>
          <Text className=' text-EacColor-BlackPearl'>Phone Number</Text>
          <TextInput
            className=' border border-gray-300 rounded-md pl-2 py-2'
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType='phone-pad' // Set keyboard type for phone numbers
          />
        </View>
        <View className='mb-4'>
          <Text className=' text-EacColor-BlackPearl'>Email</Text>
          <TextInput
            className=' border border-gray-300 rounded-md pl-2 py-2'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address' // Set keyboard type for email
            />
        </View>
        {/* {
        user["https://myroles.com/roles"] && 
        user["https://myroles.com/roles"]?.includes('Special') &&
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Switch
              value={delivery == true}
              onValueChange={() => delivery ? setDelivery(false) : setDelivery(true)}
          />
          <Text style={{ marginLeft: 10 }}>delivery</Text>
        </View>
        } */}
        {
        delivery && <View className='mb-4'>
          <Text className=' text-EacColor-BlackPearl'>Location</Text>
          <TextInput
            className=' border border-gray-300 rounded-md pl-2 py-2'
            value={location}
            onChangeText={setLocation}
            keyboardType='email-address' // Set keyboard type for email
            />
        </View>
        }
          <Text style={{ marginBottom: 10 }}>Choose your Payment method</Text>
          <View>
            <View
                // className='flex flex-row'
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <Switch
                  value={selectedPaymentMethod === 'paymaya'}
                  onValueChange={() =>selectedPaymentMethod === 'paymaya' ? handlePaymentMethodChange(null) : handlePaymentMethodChange('paymaya')}
              />
              <Text style={{ marginLeft: 10 }}>Paymaya</Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <Switch
                value={selectedPaymentMethod === 'gcash'}
                onValueChange={() => selectedPaymentMethod === 'gcash' ? handlePaymentMethodChange(null) : handlePaymentMethodChange('gcash')}
              />
              <Text style={{ marginLeft: 10 }}>GCash</Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <Switch
                value={selectedPaymentMethod === 'grab_pay'}
                onValueChange={() => selectedPaymentMethod === 'grab_pay' ? handlePaymentMethodChange(null) : handlePaymentMethodChange('grab_pay')}
              />
              <Text style={{ marginLeft: 10 }}>Grab Pay</Text>
            </View>
          </View>
        
            
</ScrollView>
{/* totals */}

<View className=' bg-EacColor-TahitiGold opacity-50 p-6 px-8 rounded-t-3xl space-y-4'>
        {
          allProcessSuccess ? (
            <View>
              <Text>All ordering processes complete</Text>
            </View>
          ) : (
            <View>
              <View className=' flex-row justify-between'>
                  <Text className=' text-EacColor-BlackPearl'>Subtotal</Text>
                  <Text className=' text-EacColor-BlackPearl'>{carttotal}</Text>
              </View>
              <View className=' flex-row justify-between'>
                  <Text className=' text-EacColor-BlackPearl'>VAT</Text>
                  <Text className=' text-EacColor-BlackPearl'>{vatRate}</Text>
              </View>
              {
                delivery && 
              <View className=' flex-row justify-between'>
                <Text className=' text-EacColor-BlackPearl'>delivery</Text>
                <Text className=' text-EacColor-BlackPearl'>20</Text>
              </View>
              }
              <View className=' flex-row justify-between'>
                  <Text className=' text-EacColor-BlackPearl font-black'>total</Text>
                  <Text className=' text-EacColor-BlackPearl font-extrabold'>{!delivery ? carttotal + (vatRate * carttotal) : carttotal + 20 + (vatRate * carttotal)}</Text>
              </View>
            </View>
          )
        }
    <View>
        {
          allProcessSuccess ? (
            <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate('Order')
                    }}
                    className=' bg-EacColor-DeepFir p-3 rounded-full'>
                    <Text className=' text-white text-center font-bold text-lg'> Place Order</Text>
              </TouchableOpacity>
          ) : (
            placeOrderReady ? (
              loading ? (
                <View  className=' bg-gray-700 p-3 rounded-full flex justify-center items-center'>
                  {/* <StatusBar className='w-10 h-10'/> */}
                  <Text className='text-white font-bold text-lg'>Loading....</Text>
                </View>
              ) : (
                <TouchableOpacity 
                    onPress={()=>{
                        // console.log('groupedItems: ',groupedItems);
                        // navigation.navigate('')
                        handlePlaceOrder()
                    }}
                    className=' bg-EacColor-DeepFir p-3 rounded-full'>
                    <Text className=' text-white text-center font-bold text-lg'> Place Order</Text>
                </TouchableOpacity>
              )
            ) : (
            <View className='bg-gray-600 p3 rounded-full'>
                <Text className='  text-center font-bold text-lg'>Place Order</Text>
            </View>
            )
          )
        }
        <Text className='text-center'>note: this does not fullt work yet</Text>
    </View>
</View>
</View>


  );
}
