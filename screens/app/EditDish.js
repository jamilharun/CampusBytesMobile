import { View, Text, ScrollView, TouchableOpacity, TextInput, Image,  Modal, FlatList, Switch, StatusBar   } from 'react-native'
import React, { useEffect, useState } from 'react'
import { urlFor } from '../../apis/sanity';
import { FontAwesome5, AntDesign, FontAwesome   } from '@expo/vector-icons';
import { ChevronLeft, MapPin } from 'react-native-feather';
import { updateItems } from '../../apis/server';

export default function EditDish({route, navigation}) {
    const {dish} = route.params;
  console.log(dish);

    const [id, setId] = useState(dish._id);
    const [dishName, setDishName] = useState(dish.dishName);
    const [type, setType] = useState(dish.type);
    const [description, setDescription] = useState(dish.description);
    const [price, setPrice] = useState(dish.price);
    const [image, setImage] = useState(dish.image);
    const [preparationTime, setPreparationTime] = useState(dish.preparationTime);
    const [shop, setShop] = useState(dish.shop)
    const [tags, setTags] = useState(dish.tags || []);
    const [isPromoted, setIsPromoted] = useState(dish.isPromoted);
    const [isFeatured, setIsFeatured] = useState(dish.isFeatured);
    const [isAvailable, setIsAvailable] = useState(dish.isAvailable);

    const [onUpdate, setOnUpdate] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [updateFailed, setUpdateFailed] = useState(false)

    const [loading, setLoading] = useState(null)

    useEffect(() => {
      if (
        dish.dishName !== dishName ||
        dish.description !== description ||
        dish.image !== image ||
        dish.price !== price ||
        dish.preparationTime !== preparationTime ||
        dish.isAvailable !== isAvailable ||
        dish.isFeatured !== isFeatured ||
        dish.isPromoted !== isPromoted ||
        dish.tags.length !== tags.length
      ) {
        setOnUpdate(true);
      } else {
        setOnUpdate(false);
      }
    }, [dish.dishName, dish.description, dish.image, dish.price, dish.preparationTime, dish.isFeatured, dish.isAvailable, dish.isPromoted, dish.tags.length,
      dishName, description, image, price, preparationTime, isAvailable, isFeatured, isPromoted, tags.length]);

    const handleTagChange = (tagIndex, text) => {
      const updatedTags = [...tags];
      updatedTags[tagIndex].tagName = text;
      setTags(updatedTags);
    };

    const addTag = (item) => {
      setTags([...tags, { _id: Math.random().toString(), tagName: item }]);
      setModalVisible(false);
    };

    const removeTag = (tagIndex) => {
      const updatedTags = tags.filter((tag, index) => index !== tagIndex);
      setTags(updatedTags);
    };

    const saveChanges = async () => {
        // Create an updated dish object with the new values
        const updatedDish = {
          _id: id,
          dishName: dishName,
          description: description,
          type: type,
          price: price,
          preparationTime: preparationTime,
            tags: tags,
          isPromoted: isPromoted,
          isFeatured: isFeatured,
          isAvailable: isAvailable,
          shop: shop
        };
        const mergedData = { ...dish, ...updatedDish };
        console.log(mergedData);
        try {
          await updateItems(mergedData );

          navigation.goBack()
        } catch (error) {
          let errorMessage = error.message;
          setUpdateFailed(true)
          setAlertModal(true)
          console.error(errorMessage);
        }
      };


      
  return (
    <View>
      {
        loading && <View>
          <StatusBar/>
        </View>
      }
      <ScrollView>

        <View className="w-full flex flex-row justify-between items-center bg-white pr-4  shadow-sm">
            <TouchableOpacity 
            onPress={()=>{
              if (onUpdate) {
                setAlertModal(true);
              } else {
                navigation.goBack()
              }
            }}
            className="TahitiGold p-3 rounded-full">
                <ChevronLeft
                className="text-EacColor-BlackPearl"
                style={{ width: 28, height: 28 }}
                />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-EacColor-TahitiGold">
                Edit Dish mode
            </Text>
        </View>
        <ScrollView>
            <View>
                {dish?.image ? 
                    (
                      <View className=' w-full h-72 flex justify-center items-center'>
                        <Image source={{uri: urlFor(dish?.image).url()}} className=' w-full h-72' />
                        <TouchableOpacity 
                          className='absolute flex justify-center items-center'
                          onPress={async ()=>{
                            const imageUri = await uploadImage()
                            setImage(imageUri)
                            }}>
                          <FontAwesome  name="edit" size={64} color="lightblue" />
                        </TouchableOpacity>
                      </View>
                    ) 
                    :
                    (<View className=' w-full h-72 flex justify-center items-center' >
                      <TouchableOpacity 
                        className='absolute flex justify-center items-center'
                        onPress={async ()=>{
                          const imageUri = await uploadImage()
                          setImage(imageUri)}}>
                          <FontAwesome5 name="plus" size={24} color="black" />
                      </TouchableOpacity>
                    </View>)
                }
            </View>
            <View className='mx-3 my-2'>
              <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">Dish Name: </Text>
                <TextInput
                  className="placeholder:text-lg w-full "
                  placeholder="Dish Name"
                  value={dishName}
                  onChangeText={text => setDishName(text)}/>
              </View>
              <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">Description: </Text>
                <TextInput
                  className="placeholder:text-lg"
                  placeholder="Description"
                  value={description}
                  onChangeText={text => setDescription(text)}/>
              </View>
              <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">Price: </Text>
                <TextInput
                  className="placeholder:text-lg w-full "
                  placeholder="Price"
                  value={price.toString()}
                  onChangeText={text => setPrice(text)}
                  keyboardType="numeric"/>
              </View>
              <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">Preparation Time: </Text>
                <TextInput
                  className="placeholder:text-lg "
                  placeholder="Preparation Time"
                  value={preparationTime.toString()}
                  onChangeText={text => setPreparationTime(text)}
                  keyboardType="numeric"/>
                <Text>mins</Text>
              </View>
              <View className="border-l-2 px-3 border-EacColor-BlackPearl">
                <Text className="text-lg font-medium">Tags: </Text>
                {tags.map((tag, index) => (
                  <View 
                    key={tag._id}
                    className="flex flex-row items-center w-full px-5 pt-4"
                    style={{ backgroundColor: 'EacColor-TahitiGold', padding: 1, borderRadius: 10 }}>
                    <Text className="placeholder:text-lg w-full">{tag.tagName}</Text>
                    
                    <TouchableOpacity 
                      className=" flex justify-center items-center"
                      onPress={() => removeTag(index)}>
                      {/* Minus button to remove tags */}
                      <FontAwesome5 name="minus" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                ))}
                  <TouchableOpacity 
                    className="flex flex-row items-center w-full px-5 pt-4"
                    onPress={() => setModalVisible(true)}>
                    {/* Plus button to add tags */}
                    <FontAwesome5 name="plus" size={20} color="black" />
                  </TouchableOpacity>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>isAvailable:</Text>
                    <Switch
                      value={isAvailable}
                      onValueChange={(bool) => setIsAvailable(bool)}/>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>isFeatured:</Text>
                    <Switch
                      value={isFeatured}
                      onValueChange={(bool) => setIsFeatured(bool)}/>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>isPromoted:</Text>
                    <Switch
                      value={isPromoted}
                      onValueChange={(bool) => setIsPromoted(bool)}
                    />
                  </View>

                  <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={(e) => {
                      setModalVisible(false);
                      console.log(e);
                    }}
                  >
                  <View>
                    <FlatList
                      data={['Tag3', 'Tag4', 'Tag5']} // Replace with your available tags data
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => addTag(item)}>
                          <Text>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Text>Close</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={alertModal}
                    onRequestClose={(e) => {
                      setAlertModal(false);
                      console.log(e);
                    }}
                  >
                  <View>
                    {
                      updateFailed ? (
                        <TouchableOpacity 
                          onPress={()=>{
                            setUpdateFailed(false)
                            setAlertModal(false)}}
                          className='flex justify-center items-center'>
                          <Text>Update Changes Failed</Text>
                        </TouchableOpacity>
                      ) : (
                        <View>
                          <Text className="text-2xl">Alert! theres onGoing changes in your Dish. do you want to discard all of it?</Text>
                          <View className="flex flex-row justify-between items-center w-full mt-5">
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                              <Text className="text-2xl">Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setAlertModal(false)}>
                              <Text className="text-2xl">No</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    }
                  </View>
                </Modal>
              </View>
            </View>
            <View className="flex flex-row justify-between items-center w-full p-5">
              {
                onUpdate ? (
                  <TouchableOpacity 
                    onPress={()=>{
                      setLoading(true)
                      saveChanges()
                      // navigation.goBack()
                    }} 
                    className="bg-EacColor-TahitiGold w-1/2 flex flex-row justify-center items-center px-5 py-4 rounded-full">
                      <AntDesign name="save" size={24} color="white" />
                      <Text className="text-white">Save Changes</Text>
                  </TouchableOpacity>
                ) : (
                  <View className="bg-gray-400 w-1/2 flex flex-row justify-center items-center px-5 py-4 rounded-full">
                    <AntDesign name="save" size={24} color="black" />
                    <Text className="text-EacColor-BlackPearl">Save Changes</Text>
                  </View>
                )
              }
            <TouchableOpacity 
              onPress={()=>{()=>{}}}
              className="bg-EacColor-DeepFir w1/4 flex flex-row justify-center items-center px-5 py-3 rounded-full">
              <Text className='font-medium text-white'>Delete</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
      </ScrollView>
    </View>
  )
}