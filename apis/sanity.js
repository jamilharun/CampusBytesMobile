import  {createClient}   from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";
import * as ImagePicker from 'expo-image-picker';
// import { Alert } from "react-native";
// import {basename} from 'path'
// import {createReadStream} from 'fs'

const client = createClient({
  projectId: process.env.EXPO_PUBLIC_SANITY_DATABASE_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
  token: process.env.EXPO_PUBLIC_SANITY_DATABASE_TOKEN
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;

//SANITY FUNCTIONS
// export const sanityFetch = async (query) => {
//   try {
//       const data = await client.fetch(query);
//       if (data.length == 0 || data == null || data == undefined) {
//         console.log('failed to fetch from Sanity.io:');
//         return null;
//       } else {
//         console.log('data retrieved from Sanity.io:', data.length);
//         return data;
//       }
//     } catch (error) {
//       console.log('An error occurred:', error);
//       throw error;
//     }
// };

// export const sanityUpdate = async (data) => {
//            const response = await sanity
//           .patch(data._id)
//           .set(data)
//           .commit();
// };

// export const sanityDelete = async (data) => {
//   try {
//       // Delete the data in Sanity.io using the appropriate method
//       const response = await client.delete(data);
  
//       return response;
//     } catch (error) {
//       console.error('Error deleting shop data in Sanity.io:', error);
//       throw error;
//     }
// };



export const uploadImage = async () => {
  console.log('attempting to upload image');
  try {
    const { status } = await ImagePicker
        .requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        console.error('Permission to access media library was denied');
    }
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      console.log('pick image successful:', result);

      const imageData = new FormData();
      imageData.append('image', {
        name: result.assets[0].uri,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
      });

      client.assets
          .upload('image', imageData)
          .then(response => {
            console.log('Image uploaded successfully:', response);
            alert('Image uploaded successfully', {response}); //for debugging
            return response;
          })
          .catch(error => {
            console.error('Error uploading image:', error);
            alert('Error', {error}); // for debugging
          });
    }
    //sanity side 
    } catch {
      console.error('Error picking image:', error);
    // Display an alert or handle the error appropriately
      alert('Error', 'An error occurred while picking the image. Please try again.');
  
    }
}
  
