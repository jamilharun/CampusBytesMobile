import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { sanityUpdate, uploadImage, urlFor } from '../../apis/sanity';
import { FontAwesome5, AntDesign, FontAwesome   } from '@expo/vector-icons';

import * as ImagePicker from 'react-native-image-picker';

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

    useEffect(() => {
      if (
        dish.dishName === dishName ||
        dish.description === description ||
        dish.image === image ||
        dish.price === price ||
        dish.preparationTime === preparationTime
      ) {
        setOnUpdate(false);
      } else {
        setOnUpdate(true);
      }
    }, [dishName, description, image, price, preparationTime]);

    const handleTagChange = (tagIndex, text) => {
      const updatedTags = [...tags];
      updatedTags[tagIndex].tagName = text;
      setTags(updatedTags);
    };

    const addTag = () => {
      setTags([...tags, { _id: Math.random().toString(), tagName: '' }]);
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
        <TouchableOpacity 
            onPress={()=>{navigation.goBack()}}
            className="TahitiGold p-3 rounded-full">
              <ChevronLeft
              className="text-EacColor-RedOxide"
              style={{ width: 40, height: 40 }}
            />
      </TouchableOpacity>
        <ScrollView>
            <View>
                //input new image
                //edit image
                {dish?.image ? 
                    (
                      <View>
                        <Image source={{uri: urlFor(dish?.image).url()}} className=' w-full h-72' />
                        <TouchableOpacity onclick={async ()=>{
                            const imageUri = await uploadImage()
                            setImage(imageUri)
                            }}>
                          <FontAwesome  name="edit" size={24} color="black" />
                        </TouchableOpacity>
                      </View>
                    ) 
                    :
                    (<View className=' w-full h-72 flex justify-center items-center' >
                      <TouchableOpacity onclick={async ()=>{
                        const imageUri = await uploadImage()
                        setImage(imageUri)}}>
                          <FontAwesome5 name="plus" size={24} color="black" />
                      </TouchableOpacity>
                    </View>)
                }
            </View>
            <View>
            <TextInput
              placeholder="Dish Name"
              value={dishName}
              onChangeText={text => setDishName(text)}
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={text => setDescription(text)}
            />
            <TextInput
              placeholder="Price"
              value={price}
              onChangeText={text => setPrice(text)}
            />
            <TextInput
              placeholder="Preparation Time"
              value={preparationTime}
              onChangeText={text => setPreparationTime(text)}
            />
                <View>
                  {tags.map((tag, index) => (
                    <View key={tag._id} style={{ backgroundColor: 'EacColor-TahitiGold', padding: 1, borderRadius: 10 }}>
                      <TextInput
                        placeholder="Tag"
                        value={tag.tagName}
                        onChangeText={(text) => handleTagChange(index, text)}
                      />
                      <TouchableOpacity onPress={() => removeTag(index)}>
                        {/* Minus button to remove tags */}
                        <FontAwesome5 name="minus" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity onPress={addTag}>
                    {/* Plus button to add tags */}
                    <FontAwesome5 name="plus" size={20} color="black" />
                  </TouchableOpacity>
                </View>
            </View>
            {
              onUpdate ? (
                <TouchableOpacity onclick={()=>{saveChanges()}} className="bg-EacColor-TahitiGold">
                    <AntDesign name="save" size={24} color="white" />
                    <Text className="text-white">Save Changes</Text>
                </TouchableOpacity>
              ) : (
                <View className="bg-gray-600">
                  <AntDesign name="save" size={24} color="black" />
                  <Text className="text-EacColor-BlackPearl">Save Changes</Text>
                </View>
              )
            }
        </ScrollView>
    </View>
  )
}