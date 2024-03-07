    //api callback function

import axios from "axios";

const ip = process.env.EXPO_PUBLIC_SERVER
console.log(ip);

//initial fetch
// idk why this is problematic
export const axiosfetchShop = async () => {
    try {
        await axios.get(`${ip}/api/sanity/shop/`)
          .then( response => {
            console.log('successful');
            return response.data;
          })
          .catch(error => {
            console.error('Error:', error);
            return error;
          });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// build in fetch is good
export const fetchShop = async () => {
  try {
    const response = await fetch(`${ip}/api/sanity/shop/`);
    const data = await response.json();
    
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
//fetch by id
// use case: managing shopOwner shops
export const fetchShopById = async (id) => {
  console.log(id);
  try {
    // api/sanity/shopid/MichaelRodriguez
    const response = await axios.get(`${ip}/api/sanity/shopid/${id}/`);
    const data = await response.data;

    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const addToMenu = async (newData) => {
  console.log(newData);

  try {
    // Sends a PUT request to the server API endpoint
    const response = await axios.put(`${ip}/api/sanity/shop/addNewData`, { newData });

    // Assuming you want to return data from the API response
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error for further handling in the calling function
  }
};