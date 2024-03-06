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
  // const reqdata = {shopOwner: id}
  try {
    const response = await axios.post(`${ip}/api/sanity/shop/id`, {shopOwner: id});
    const data = await response.data;

    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};