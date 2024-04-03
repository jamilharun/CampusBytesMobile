    //api callback function

import axios from "axios";

const ip = process.env.EXPO_PUBLIC_SERVER
// console.log(ip);

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
  console.log('fetching shop by id', _id);
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


export const createCustomOrder = async (shopRef, amount, name, email, phone, method, userRef,
  groupNum, serviceTax, deliveryFee, totalAmount, location, isSpecial, isFinished, cartItems, created_at) => {
  console.log('create Custom Order');
  
  // const userRef =
  //for initialize payment 
  
  try {
    const response = await axios.post(`${ip}/api/postgres/order/new/custom`, {shopRef, amount, name, email, 
      phone, method, userRef, groupNum, serviceTax, deliveryFee, totalAmount, location, isSpecial, 
      isFinished, cartItems, created_at})
    if (response.data) {
      console.log('createCustomOrder successful');
      return response.data;
    } else {
      console.log('createCustomOrder failed');
    }
  } catch (error) {
    console.log('Server connection failed', error);
  }
};





export const initializePay = async (
  _id, totalAmount, name, email, phoneNum, method, created_at
) => {
  const amount = totalAmount * 100;

  try {
    const response = await axios.post(`${ip}/api/paymongo/initializePay`, {
      _id, amount, name, email, phone: phoneNum, method, created_at
    });
    if (response.data) {
      console.log('initializePay successful on attempt');
      return response.data;
    }
  } catch (error) {
    console.log('Server connection failed on attempt', error);
    return null;
  }
  console.log('All retries failed. Payment initialization unsuccessful.');
  return null;
};


export const newOrder = async ( paymentInt, userid, shopid, randomNum, groupedItems, serviceFee, 
                                deliveryFee, totalAmount, special, created_at, location) => {
  console.log('adding new order');
  const paymentRef = paymentInt;
  const userRef = userid;
  const shopRef = shopid;
  const groupNum = randomNum;
  const isSpecial = special;
  const cartItems = groupedItems;
  const serviceTax = serviceFee;
  const isFinished = false;
  try {
    const response = await axios.post(`${ip}/api/postgres/order/new`, {
      paymentRef, userRef, shopRef, serviceTax, groupNum, totalAmount,deliveryFee,isSpecial, created_at,
      cartItems, location, isFinished
    })
    if (response.data) {
      console.log('initializePay successful');
      return response.data
    } 
    console.log('initializePay failed');
    return false

  } catch (error) {
    console.log('server connection failed', error);    
  }
};

export const checkPaySuccess = async (id, retryCount = 0) => {
  console.log('check if pay is successful (attempt:', retryCount + 1, ')');
  try {
    console.log(`${ip}/api/postgres/order/isSuccess/${id}`);
    const response = await axios.get(`${ip}/api/postgres/order/isSuccess/${id}`);
    if (response.data) {
      console.log('data fetched');
      return response.data; // Payment successful
    } else {
      console.log('error fetched');
      // Payment not successful yet, check if retries are exhausted
      if (retryCount < 10) {
        // Retry after a delay (adjust delay as needed)
        const delay = 30 * 1000; // 3 seconds delay between retries
        console.log(`Payment not successful yet. Retrying in ${delay / 1000} seconds...`);
        return new Promise(resolve => setTimeout(() => resolve(checkPaySuccess(id, retryCount + 1)), delay));
      } else {
        console.log('Payment check failed after retries');
        return null; // Payment unsuccessful after retries
      }
    }
  } catch (error) {
    console.log('connection to database failed');
    throw error;
  }
};

export const fetchCheckout = async (id) => {
  console.log('Fetching checkout and its associated data');

  try {
    const response = await axios.get(`${ip}/api/postgres/order/user/${id}/checkout`);

    // Parse and process the response data
    const parsedData = response.data; // Assuming JSON response

    // Return the parsed data for further use
    // console.log(parsedData.length);
    return parsedData;

  } catch (error) {
    // Handle errors appropriately
    console.error('Error fetching checkout:', error);
    // Consider options like retrying, logging, or returning an error response
    throw error; // Rethrow or handle the error as needed
  }
};


export const fetchUserQueue = async (id) => {
  console.log('fetching user queue');
  try {
    const response = await axios.get(`${ip}/api/postgres/order/user/${id}/queue`)
    if (response.data === 0) {
      console.log('no queue fetched');
      return null
    } else {
      console.log(response.data);
      return response.data
    }
  } catch (error) {
    console.log('no connection to the database');
  }
}

export const getMyQueue = async (id) => {
  console.log('fetching my queue');
  try {
    const response = await axios.get(`${ip}/api/postgres/order/user/${id}/queue`)
    if (response.data === 0) {
      console.log('no queue fetched');
      return null
    } else {
      console.log(response.data);
      return response.data
    }
  } catch (error) {
    console.log('no connection to the database');
  }
};


export const getMyShopQueue = async (id) => {
  console.log('fetching my shop queue')
  try {
    const response = await axios.get(`${ip}/api/postgres/order/shop/${id}/queue`)
    if (response.data === 0) {
      console.log('no shop queue fetched');
      return null
    } else {
      console.log(response.data);
      return response.data
    }
  } catch (error) {
    console.log('no connection to the database', error);
  }
};

export const getAllShopQueue = async (id) => {
  console.log('fetching all shop queue');;
  try {
    const response = await axios.get(`${ip}/api/postgres/order/shop/${id}/queue`)
    if (response.data === 0) {
      console.log('no shop queue fetched');
      return null
    } else {
      console.log(response.data);
      return response.data
    }
  } catch (error) {
    console.log('no connection to the database', error);
  }
};


export const getnewOrder = async (checkingout) => {
  console.log('getting new order');
  const checkoutid = checkingout.checkoutid
  const userref = checkingout.userref;
  const shopref = checkingout.shopref;
  const groupnum = checkingout.groupnum;
  try {
    const response = await axios.post(`${ip}/api/postgres/order/getNewOrder`, {checkoutid, userref, shopref, groupnum})
    console.log(response.data);
    if (response.data) {
      console.log('fetching new order successful' );
      return response.data
    } else {
      console.log('fetching new order failed');  
    }
  } catch (error) {
    console.log('server connection failed', error);    
  }
};

export const getnewQueue = async (checkingout) => {
  console.log('fetching my queue');
  const checkoutid = checkingout.checkoutid
  const shopref = checkingout.shopref
  const isspecial = checkingout.isspecial
  try {
    // id = checkout id
    const response = await axios.post(`${ip}/api/postgres/order/user/new/queue`, {checkoutid, shopref, isspecial})
    if (response.data === 0) {
      console.log('no queue fetched');
      return null
    } else {
      console.log(response.data);
      return response.data
    }
  } catch (error) {
    console.log('no connection to the database');
  }
};

//seller
export const fetchShopQueue = async (shopid) => {
  console.log('fetch shop queue');
  try {
    const response = await axios.get(`${ip}/api/postgres/order/shop/${shopid}/queue`)
    if (response.data === 0) {
      console.log('no queue fetched');
      return null
    } else {
      console.log(response.data);
      return response.data
    }
  } catch (error) {
    console.log('no connection to the database');
  }
};

export const fetchAllCheckout = async (shopid) => {
   console.log('getting all checkout');
   try {
    const response = await axios.get(`${ip}/api/postgres/order/shop/${shopid}/checkout`)
    if (response.data === 0 || response.data === undefined) {
      console.log('no checkout fetched');
      // return null
    } else {
      console.log(response.data);
      return response.data
    }
   } catch (error) {
    console.log('no xonnection to the database');
   }
}

export const finishOrder = async (checkoutid) => {
  console.log('this will finish order.. set to pickup');
  try {
   const response = await axios.get(`${ip}/api/postgres/order/readypickup/${checkoutid}`)
   if (response.data === 0 || response.data === undefined) {
     console.log('no checkout fetched');
     // return null
   } else {
     console.log(response.data);
     return response.data
   }
  } catch (error) {
   console.log('no connection to the database');
   console.log('cant connect to ', `${ip}/api/postgres/order/readypickup/${checkoutid}`);
  }
}

export const viewPickup = (userid) => {
  console.log('this check if there item ready to pickup');
  try {
    
  } catch (error) {
    console.log('no connection to the database');
  }
}

export const removePickup = async (checkoutid) => {
  console.log('this will remove the checkoutid on readt to pickup queue');
  try {
    const response = await axios.get(`${ip}/api/postgres/order/removePickup/${checkoutid}`)
    if (response.data === 0 || response.data === undefined) {
      console.log('no checkout fetched');
      // return null
    } else {
      console.log(response.data);
      return response.data
    }
  } catch (error) {
    console.log('no connection to the database');
  }
}
// export const getMyQueueCheckout = async () => {
//   console.log('user queueu checkout');
//   try {
//     const response = await axios.get(`${ip}/api/postgres/order/usercheckoutandqueue/${id}`)
//     if (response.data === 0) {
//       console.log('no queue fetched');
//       return null
//     } else {
//       console.log(response.data);
//       return response.data
//     }
//   } catch (error) {
//     console.log('no connection to the database');
//   }
// }

// not working
//============================================
// export const uploadImageServer = async (formData) => {
//   try {
//     // console.log(formData[1]);
//     const response = await axios.post(`${ip}/api/sanity/upload/`, formData, 
//     {
//       formData,
//       headers: {
//         Accept: 'application/json',
//         'Content-Type':'multipart/form-data',
//       }
//     }
//     );
//     console.log('Image upload successful:', response.data);
//   } catch (error) {
//     console.error('Image upload failed:', error);
//   }
// }

// not working
//===================================

// export const updateItems = async (updatedData) => {
//   console.log(updatedData);
//   try {
//     const result = await axios.put(`${ip}/api/sanity/shop/updatedata`, {updatedData});
//     if (result) {
//       console.log('updated');
//     } else {
//       console.log('not updated');
//     }
//   } catch (error) {
    
//   }
// }