import  {createClient}   from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";
import * as ImagePicker from 'expo-image-picker';

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

//sanity cors add http://localhost:3000

//SANITY FUNCTIONS
export const sanityFetch = async (query) => {
  try {
      const data = await client.fetch(query);
      if (data.length == 0 || data == null || data == undefined) {
        console.log('failed to fetch from Sanity.io:');
        return null;
      } else {
        console.log('data retrieved from Sanity.io:', data.length);
        return data;
      }
    } catch (error) {
      console.log('An error occurred:', error);
      throw error;
    }
};

export const sanityUpdate = async (data) => {
  // Update the data in Sanity.io using the appropriate method
           const response = await sanity
          .patch(data._id)
          .set(data)
          .commit();
};

export const sanityDelete = async (data) => {
  try {
      // Delete the data in Sanity.io using the appropriate method
      const response = await client.delete(data);
  
      return response;
    } catch (error) {
      console.error('Error deleting shop data in Sanity.io:', error);
      throw error;
    }
};


export const uploadImage = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access media library denied');
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // Convert the local URI to a base64 string
      const localUri = result.uri;
      const asset = await Asset.fromURI(localUri);
      const base64 = await asset.base64Async();

      // Upload the base64 string to Sanity
      const response = await client.assets
        .upload('image', base64, { contentType: 'image/jpeg', filename: 'uploaded_image.jpg' });

      console.log('Upload Success:', response);
      return response;
    } else {
      console.log('Image picker cancelled');
      return null;
    }
  } catch (error) {
    console.log('Error uploading image to Sanity.io:', error);
    throw error;
  }
};