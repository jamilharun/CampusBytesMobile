import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text } from 'react-native';
import { ScrollView, TouchableOpacity, View } from 'react-native'
import client, { urlFor } from '../apis/sanity';
import { fetchingCategoryQuery, fetchingProductQuery } from '../utils/query';

export default function Categories() {
  const [loading, setLoading] = useState(null)
  const [event, setEvent] = useState(null)

  const [categoryData, getCategoryData] = useState(null)
  const [productData, getProductData] = useState(null)

  const [activeCategory, setActiveCategory] = useState(null);

  
  const fetchCategory = () => {
    setLoading(true)
    try {
      client
        .fetch(fetchingCategoryQuery)
        .then((data)=>{
          // console.log('fetching category successful' + data);
          setLoading(false)
          getCategoryData(data)
          
        })
        .catch((err)=>{
          console.log(err);
          setEvent(err)
          setLoading(false)
        })

    } catch (err) {
      console.log(err);
      setEvent(err)
      setLoading(false)
    }  
  }

  const initialFetch = () => {
    useEffect(()=>{
      fetchCategory()
    })
  }
  initialFetch()

  useEffect(()=>{
    console.log(event);
  },[event])

  return (
    <View>
      {
        categoryData ? (
          <View className=' mt-2'>
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              className=" overflow-visible"
              contentContainerStyle={{
                paddingHorizontal:15
              }}>
                {
                  categoryData?.map((category)=>{
                    let isActive = category?._id==activeCategory;
                    let btnClass = isActive? ' bg-gray-600' : 'bg-gray-200';
                    let textClass = isActive? ' font-semibold text-gray-600' : 'text-gray-200';
                    // const imageUrl = urlFor(category?.image).url();
                    return (
                      <View key={category._id} className=' flex justify-center items-center mr-4'>
                        <TouchableOpacity
                          onPress={()=> setActiveCategory()}
                          className={' p-1 rounded-full shadow bg-gray-200'+btnClass}>
                          <Image className=' rounded-full' style={{width:45, height: 45}} source={{
                              uri: urlFor(category?.image).url(),
                          }} />
                          {/* <Text>{category.categoryName}</Text> */}
                        </TouchableOpacity>
                          <Text className={' text-sm'+textClass}></Text>
                      </View>
                    )
                  })
                }

            </ScrollView>
          </View>
        ) : (
          <View className=" flex justify-center items-center">
            <ActivityIndicator size={"large"} />
          </View>
        )
      }
    </View>
  )
}
