import { View, Text, TouchableOpacity, StatusBar, ScrollView, Switch, TextInput, Modal, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, MapPin } from 'react-native-feather';
import { uploadImage, urlFor } from '../../apis/sanity';
import { FontAwesome5, AntDesign, FontAwesome   } from '@expo/vector-icons';


export default function AddGoods({route, navigation}) {
  const data = route.params;

  const [itemId, setItemId] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [itemOwner, setItemOwner] = useState();
  const [itemImage, setItemImage] = useState(null);
  const [itemDescription, setItemDescription] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [preparationTime, setPreparationTime] = useState(null);
  const [type, setType] = useState(data);
  const [isAvailable, setIsAvailable] = useState(null);
  const [isFeatured, setIsFeatured] = useState(null);
  const [isPromoted, setIsPromoted] = useState(null);
  const [tags, setTags] = useState([]);

  const [onUpdate, setOnUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  useEffect(() => {
    console.log(data);
    if (
      itemId ||
      itemName ||
      itemOwner  ||
      itemImage  ||
      itemDescription  ||
      itemPrice  ||
      preparationTime  ||
      isAvailable  ||
      isFeatured  ||
      isPromoted  ||
      tags.length > 0
    ) {
      setOnUpdate(true);
    } else {
      setOnUpdate(false);
    }
  }, [itemId, itemName, itemOwner, itemImage, itemDescription, itemPrice, 
    preparationTime, type, type, isAvailable, isFeatured, isPromoted, tags.length]);

    const addTag = (item) => {
      setTags([...tags, { _id: Math.random().toString(), tagName: item }]);
      setModalVisible(false);
    };

    const removeTag = (tagIndex) => {
      const updatedTags = tags.filter((tag, index) => index !== tagIndex);
      setTags(updatedTags);
    };

    const saveChanges = async () => {
      const updatedDish = {
        _id: itemId, //generate new id
        name: itemName,
        description: itemDescription,
        type: type,
        image: itemImage, // Corrected: Use itemImage instead of image
        price: itemPrice, // Corrected: Use itemPrice instead of price
        preparationTime: preparationTime,
        tags: tags,
        isPromoted: isPromoted,
        isFeatured: isFeatured,
        isAvailable: isAvailable,

      };
      
    };

  return (
    <View>
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
                style={{ width: 28, height: 28 }}/>
            </TouchableOpacity>
            <Text className="text-xl font-bold text-EacColor-TahitiGold">
                Add to menu
            </Text>
        </View>
        <ScrollView>
            <View>
                {itemImage? 
                    (
                      <View className=' w-full h-72 flex justify-center items-center'>
                        <Image source={{uri: urlFor(itemImage).url()}} className=' w-full h-72' />
                        <TouchableOpacity 
                          className='absolute flex justify-center items-center'
                          onPress={async ()=>{
                            const imageUri = await uploadImage()
                            setItemImage(imageUri)
                            }}>
                          <FontAwesome  name="edit" size={64} color="lightblue" />
                        </TouchableOpacity>
                      </View>
                    ) 
                    :
                    (<View className=' w-full h-72 bg-gray-300 flex justify-center items-center' >
                      <TouchableOpacity 
                        className='absolute flex justify-center items-center'
                        onclick={async ()=>{
                          const imageUri = await uploadImage()
                          setItemImage(imageUri)}}>
                          <FontAwesome5 name="plus" size={24} color="black" />
                      </TouchableOpacity>
                    </View>)
                }
            </View>
            <View>
            <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">Name: </Text>
                <TextInput
                  className="placeholder:text-lg w-full "
                  placeholder="Dish Name"
                  value={itemName}
                  onChangeText={text => setItemName(text)}/>
              </View>
              <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">Description: </Text>
                <TextInput
                  className="placeholder:text-lg"
                  placeholder="Description"
                  value={itemDescription}
                  onChangeText={text => setItemDescription(text)}/>
              </View>
              <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">Price: </Text>
                <TextInput
                  className="placeholder:text-lg w-full "
                  placeholder="Price"
                  value={itemPrice}
                  onChangeText={text => setItemPrice(text)}
                  keyboardType="numeric"/>
              </View>
              <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">Preparation Time: </Text>
                <TextInput
                  className="placeholder:text-lg "
                  placeholder="Preparation Time"
                  value={preparationTime}
                  onChangeText={text => setPreparationTime(text)}
                  keyboardType="numeric"/>
                <Text>mins</Text>
              </View>
              {/* <TouchableOpacity onPress={()=>setModalType(true)} className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">item Type: </Text>
                <Text >{type ? type: 'data type'}</Text>
                
              </TouchableOpacity> */}
              <View className="flex flex-row items-center w-full mb-4">
                <Text className="text-lg font-medium">item Type: </Text>
                <Text className="text-EacColor-BlackPearl text-lg">{data}</Text>
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
                    <Text className="text-2xl">Alert! theres onGoing inputed data in Add Goods. do you want to discard all of it?</Text>
                    <View className="flex flex-row justify-between items-center w-full mt-5">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Text className="text-2xl">Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAlertModal(false)}>
                      <Text className="text-2xl">No</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                {/* <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalType}
                    onRequestClose={(e) => {
                      setModalType(false);
                      console.log(e);
                    }}
                  > */}
                  {/* <View>
                    <FlatList
                      data={['shop', 'product']} // Replace with your available tags data
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                          setType(item)
                          setModalType(false)}}>
                          <Text>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                    <TouchableOpacity onPress={() => setModalType(false)}>
                      <Text>Close</Text>
                    </TouchableOpacity>
                  </View> */}
                {/* </Modal> */}
              </View>
            </View>
            <View className="flex flex-row justify-between items-center w-full p-5">
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
            <TouchableOpacity 
              onclick={()=>{()=>{}}}
              className="bg-EacColor-DeepFir w1/4 flex flex-row justify-center items-center px-5 py-3 rounded-full">
              <Text className='font-medium text-white'>Delete</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
      </ScrollView>
    </View>
  )
}