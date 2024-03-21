    //api callback function

import axios from "axios";

const ip = process.env.EXPO_PUBLIC_SERVER
console.log(ip);

export const toDatabase = async ( 
  email, family_name, given_name, nickname, name, picture, sub) => {  
  try {
    await axios.post(`${ip}/api/postgres/user/insertUser`, {
      email, family_name, given_name, nickname, name, picture, userId: sub})
    console.log('inserting success');
  } catch (error) {
    console.log('insert error', error);
  }
}
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
export const fetchShopById = async (_id) => {
  console.log(_id);
  try {
    // api/sanity/shopid/MichaelRodriguez
    const response = await axios.get(`${ip}/api/sanity/shop/${_id}/`);
    const data = await response.data;

    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// ========================
// not working
export const addToMenu = async (newData, formData) => {
  console.log('posting to server');

  try {
    // Sends a PUT request to the server API endpoint
    // const response = 
    await axios.post(`${ip}/api/sanity/shop/addNewData`, {
      newData,
      formData,
      headers: {
        Accept: 'application/json',
        'Content-Type':'multipart/form-data',
      }
     });

    // Assuming you want to return data from the API response
    // return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error for further handling in the calling function
  }
};

export const initializePay = async (
  _id, totalAmount, name, email, phoneNum, method, created_at) => {
  try {
    const response = await axios.post(`${ip}/api/paymongo/initializePay`, {
      _id, amount: totalAmount, name, email, phone: phoneNum, method, created_at})
    if (response.data) {
      console.log('initializePay successful');
      return response
    } 
    console.log('initializePay failed');
    return null;

  } catch (error) {
    console.log('server connection failed:', error);
    
  }
}

export const newOrder = async (groupedItems, user, shop, carttotal, randomNum, serviceFee, selectedPaymentMethod) => {
  let userRef = user._id;
  let shopRef = shop._id;
  let serviceTax = serviceFee;
  let groupNum = randomNum;
  let totalAmount = carttotal;
  let created_at = Date.now();
  // let cartItem = grou
  groupNum.map((data)=>{
    let item = data[0]
  })
  try {
    const response = await axios.post(`${ip}/api/postgres/order/new`, {
      userRef, cartItem, shopRef, serviceTax, groupNum, totalAmount, created_at
    })
    if (response.data) {
      console.log('initializePay successful');
      return response
    } 
    console.log('initializePay failed');
    return response.err

  } catch (error) {
    console.log('server connection failed');    
  }
}

// not working
//============================================
export const uploadImageServer = async (formData) => {
  try {
    // console.log(formData[1]);
    const response = await axios.post(`${ip}/api/sanity/upload/`, formData, 
    {
      formData,
      headers: {
        Accept: 'application/json',
        'Content-Type':'multipart/form-data',
      }
    }
    );
    console.log('Image upload successful:', response.data);
  } catch (error) {
    console.error('Image upload failed:', error);
  }
}

// not working
//===================================

export const updateItems = async (updatedData) => {
  console.log(updatedData);
  try {
    const result = await axios.put(`${ip}/api/sanity/shop/updatedata`, {updatedData});
    if (result) {
      console.log('updated');
    } else {
      console.log('not updated');
    }
  } catch (error) {
    
  }
}