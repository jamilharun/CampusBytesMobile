import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { ChevronLeft, MapPin } from 'react-native-feather';
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import { selectShop } from '../../slices/ShopSlice';
import { selectCartItems, selectCarttotal } from '../../slices/CartSlice';
import { initializePay, newOrder } from '../../apis/server';

export default function PaymentScreen({ route, navigation }) {
  const { groupedItems } = route.params;
  const { user } = useContext(AuthContext);
  const shop = useSelector(selectShop);
  const cartItems = useSelector(selectCartItems);
  const carttotal = useSelector(selectCarttotal);

  const [randomNum, setRandomNum] = useState(null);
  const [delivery, setDelivery] = useState(null)
  const [serviceFee, setServiceFee] = useState(null); // Assuming serviceFee is used later
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [name, setName] = useState(null); // State for name
  const [phoneNumber, setPhoneNumber] = useState(null); // State for phone number
  const [email, setEmail] = useState(null); // State for email
  const [placeOrderReady, setPlaseOrderReady] = useState(null)
  const [totalAmount, getTotalAmount] = useState(null)

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    setRandomNum(randomNumber);
  }, []); // Empty dependency array for one-time generation

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    if (method == 'paymaya') {
        setServiceFee(0.020)
    } else if (method == 'gcash') {
        setServiceFee(0.025)
    } else if (method == 'grab_pay') {
        setServiceFee(0.022)
    } else {
        console.log('no payment method selected');
        setServiceFee(0)
    }
  };
  useEffect(()=>{
    if (name &&
        email &&
        phoneNumber &&
        selectedPaymentMethod) {setPlaseOrderReady(true)}
      
      console.log(shop);
      
        const totals = !delivery ? carttotal + (serviceFee * carttotal) : carttotal + 20 + (serviceFee * carttotal)
      console.log(totals);
      getTotalAmount(totals)
  },[name, email, phoneNumber, selectedPaymentMethod, delivery])
  
  
  const handlePlaceOrder = async () => {
    const created_at = Date.now()
    
    try {
      // asuming payment is successful
      const paymentResponse = await initializePay(shop._id, totalAmount, name, email, phoneNumber, selectedPaymentMethod, created_at);
      if (paymentResponse) {
        console.log(paymentResponse);
      }

      const checkingout = await initializeOrder()

      navigation.navigate('Order')
  } catch (error) {
      console.error('Error processing payment:', error);
      // Handle general errors
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Switch
              value={delivery == true}
              onValueChange={() => delivery ? setDelivery(false) : setDelivery(true)}
          />
          <Text style={{ marginLeft: 10 }}>delivery</Text>
        </View>
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
    <View className=' flex-row justify-between'>
        <Text className=' text-EacColor-BlackPearl'>Subtotal</Text>
        <Text className=' text-EacColor-BlackPearl'>{carttotal}</Text>
    </View>
    <View className=' flex-row justify-between'>
        <Text className=' text-EacColor-BlackPearl'>VAT</Text>
        <Text className=' text-EacColor-BlackPearl'>{serviceFee}</Text>
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
        <Text className=' text-EacColor-BlackPearl font-extrabold'>{!delivery ? carttotal + (serviceFee * carttotal) : carttotal + 20 + (serviceFee * carttotal)}</Text>
    </View>
    <View>
        {
            placeOrderReady ? (
            <TouchableOpacity 
                onPress={()=>{
                    // console.log('groupedItems: ',groupedItems);
                    // navigation.navigate('')
                    handlePlaceOrder()
                }}
                className=' bg-EacColor-DeepFir p-3 rounded-full'>
                <Text className=' text-white text-center font-bold text-lg'> Place Order</Text>
            </TouchableOpacity>
            ) : (
            <View className='bg-gray-600 p3 rounded-full'>
                <Text className='  text-center font-bold text-lg'>Place Order</Text>
            </View>
            )
        }
        <Text className='text-center'>note: this does not fullt work yet</Text>
    </View>
</View>
</View>


  );
}
