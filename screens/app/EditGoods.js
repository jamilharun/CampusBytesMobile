import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native'
import React from 'react'
import { ChevronLeft, MapPin } from 'react-native-feather';


export default function EditGoods({ route, navigation }) {
  const {data} = route.params;
  return (
    <View>
      <TouchableOpacity 
            onPress={()=>{navigation.goBack()}}
            className="TahitiGold p-3 rounded-full">
              <ChevronLeft
              className="text-EacColor-RedOxide"
              style={{ width: 40, height: 40 }}
            />
      </TouchableOpacity>
      <StatusBar style='light'/>
      <ScrollView>
        <View>
          <Text>
            Dishes
          </Text> 
        </View>
        {
          data?.dishes?.map((dish)=>{
            return (
              <TouchableOpacity key={dish._id} onPress={()=>{navigation.navigate('EditDish', {dish})}}>
                <Image className=' w-full h-72' source={{uri: urlFor(dish?.image).url()}} />
                <View>
                  <Text>{dish.dishName}</Text>
                  <Text>{dish.price}</Text>
                  <Text>{dish.description}</Text>
                  <View className='flex flex-row space-x-2'>
                    <ScrollView horizontal={true}>
                      {
                        dish?.tags?.map((tag)=>{
                          return (
                            <View key={tag._id} className='bg-EacColor-TahitiGold p-1 rounded-full'>
                              <Text className='text-white'>{tag.tagName}</Text>
                            </View>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
        <View><Text >Products</Text></View>
        {
          data?.products?.map((product)=>{
            return (
              <TouchableOpacity key={product._id} onPress={()=>{navigation.navigate('EditProduct', {product})}}>
                <Image className=' w-full h-72' source={{uri: urlFor(product?.image).url()}} />
                <View>
                  <Text>{product.productName}</Text>
                  <Text>{product.Price}</Text>
                  <Text>{product.description}</Text>
                  <View className='flex flex-row space-x-2'>
                    <ScrollView horizontal={true}>
                      {
                        product?.tags?.map((tag)=>{
                          return (
                            <View key={tag._id} className='bg-EacColor-TahitiGold p-1 rounded-full'>
                              <Text className='text-white'>{tag.tagName}</Text>
                            </View>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}