import  {createClient}   from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";

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
      if (data.length == 0) {
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