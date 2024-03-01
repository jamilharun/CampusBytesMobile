import { View, Text, ScrollView, TouchableOpacity, TextInput, Image,  Modal, FlatList  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { sanityUpdate, uploadImage, urlFor } from '../../apis/sanity';
import { FontAwesome5, AntDesign, FontAwesome   } from '@expo/vector-icons';
import { ChevronLeft, MapPin } from 'react-native-feather';

export default function EditDish({route, navigation}) {
    const {dish} = route.params;

    const [id, setId] = useState(dish.id);
    const [dishName, setDishName] = useState(dish.dishName);
    const [type, setType] = useState(dish.type);
    const [description, setDescription] = useState(dish.description);
    const [price, setPrice] = useState(dish.price);
    const [image, setImage] = useState(dish.image);
    const [preparationTime, setPreparationTime] = useState(dish.preparationTime);
    
    const [tags, setTags] = useState(dish.tags || []);
    const [isPromoted, setIsPromoted] = useState(dish.isPromoted);
    const [isFeatured, setFeatured] = useState(dish.isFeatured);
    const [isAvailable, setAvailable] = useState(dish.isAvailable);

    const [onUpdate, setOnUpdate] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
      if (
        dish.dishName !== dishName ||
        dish.description !== description ||
        dish.image !== image ||
        dish.price !== price ||
        dish.preparationTime !== preparationTime
      ) {
        setOnUpdate(true);
      } else {
        setOnUpdate(false);
      }
    }, [dish.dishName, dish.description, dish.image, dish.price, dish.preparationTime, 
      dishName, description, image, price, preparationTime]);

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
          image: image,
          price: price,
          preparationTime: preparationTime,
          isPromoted: isPromoted,
          isFeatured: isFeatured,
          isAvailable: isAvailable,

        };
        const mergedData = { ...dish, ...updatedDish };
        console.log(mergedData);
        try {
          await sanityUpdate(mergedData );
        } catch (error) {
          let errorMessage = error.message;
          console.error(errorMessage);
        }
      };


      
  return (
    <View>
      <ScrollView>

        <View className="w-full flex flex-row justify-between items-center bg-white pr-4  shadow-sm">
            <TouchableOpacity 
            onPress={()=>{navigation.goBack()}}
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
                          onclick={async ()=>{
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
                        onclick={async ()=>{
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
                  onChangeText={text => setDishName(text)}
                />
              </View>
              <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">Description: </Text>
                <TextInput
                  className="placeholder:text-lg w-full "
                  placeholder="Description"
                  value={description}
                  onChangeText={text => setDescription(text)}
                />
              </View>
              <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">Price: </Text>
                <TextInput
                  className="placeholder:text-lg w-full "
                  placeholder="Price"
                  value={price}
                  onChangeText={text => setPrice(text)}
                />
              </View>
              <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">Preparation Time: </Text>
                <TextInput
                  className="placeholder:text-lg w-full "
                  placeholder="Preparation Time"
                  value={preparationTime}
                  onChangeText={text => setPreparationTime(text)}
                />
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
              </View>
            </View>
            <View className="flex flex-row justify-center items-center w-full mt-5">
              {
                onUpdate ? (
                  <TouchableOpacity 
                    onclick={()=>{saveChanges()}} 
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
            </View>
        </ScrollView>
      </ScrollView>
    </View>
  )
}