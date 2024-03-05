    //api callback function

import axios from "axios";

const ip = process.env.EXPO_PUBLIC_SERVER

export const fetchShop = async () => {
    try {
        await axios.get(`${ip}/api/sanity/shop/`)
          .then(response => {
            console.log(response.data);
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