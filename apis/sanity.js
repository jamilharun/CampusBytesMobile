import  {createClient}   from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";
import * as ImagePicker from 'expo-image-picker';
import * as Asset from 'expo-asset';

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

//==============================================================

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
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    });
    if (!result.cancelled) {
      console.log(result);
      return result ;
    }
    
    //sanity side 
    } catch {
      console.error('Error picking image:', error);
    // Display an alert or handle the error appropriately
      alert('Error', 'An error occurred while picking the image. Please try again.');
  
    }
}
  
