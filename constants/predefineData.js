export const design = {
    favicon: '../assets/favicon.png',
    adaptive: '../assets/adaptive-icon.png',
    auth0: '../assets/images/auth0-logo.png',
}

export const predefineshopData = [
    {
      "_type": "shop",
      "_id": "shop1",
      "isPromoted": true,
      "description": "A trendy shop with a variety of products.",
      "isActive": true,
      "logo": 'image-6279e2f3a42a550945a90205830815607e5e3424-600x600-webp',
      "slug": 'Trendy-Shop',
      "shopOwner": "John Doe",
      "cover": "image-9c385527071daa91e2098067f7f0ed00e8380f53-300x240-png",
      "isFeatured": true,
      "longitude": -73.9877,
      "latitude": 40.7320,
      "shopName": "Trendy Shop",
      "tags": [
        {
          "_id": "tag1",
          "tagName": "Fashion",
          "color": "#3498db"
        },
        {
          "_id": "tag2",
          "tagName": "Accessories",
          "color": "#2ecc71"
        }
      ],
      "products": [
        {
          "_id": "product1",
          "productName": "Stylish Shirt",
          "slug": "stylish-shirt",
          "tags": [
            {
              "_id": "tag1",
              "tagName": "Fashion",
              "color": "#3498db"
            }
          ],
          "image": "image-599fc58300466d0d8fa86a9ae0393846d0205f39-1024x1024-jpg",
          "price": 29.99,
          "description": "A comfortable and stylish shirt for any occasion.",
          "isFeatured": true,
          "isAvailable": true,
          "isPromoted": true,
          "_type": "product"
        }
        // Add more products if needed
      ],
      "dishes": [
        {
          "_id": "dish34-53451",
          "isPromoted": true,
          "dishName": "Delicious Pasta",
          "isFeatured": true,
          "isAvailable": true,
          "preparationTime": 20,
          "description": "Homemade pasta with a rich and flavorful sauce.",
          "_type": "dish",
          "price": 14.99,
          "image": "image-599fc58300466d0d8fa86a9ae0393846d0205f39-1024x1024-jpg",
          "tags": [
            {
              "_id": "tag3",
              "tagName": "Food",
              "color": "#e74c3c"
            }
          ]
        },
        {
          "_id": "dish3-452",
          "isPromoted": true,
          "dishName": "Delicious Pasta",
          "isFeatured": true,
          "isAvailable": false,
          "preparationTime": 20,
          "description": "Homemade pasta with a rich and flavorful sauce.",
          "_type": "dish",
          "price": 14.99,
          "image": "image-599fc58300466d0d8fa86a9ae0393846d0205f39-1024x1024-jpg",
          "tags": [
            {
              "_id": "tag3",
              "tagName": "Food",
              "color": "#e74c3c"
            }
          ]
        }
        // Add more dishes if needed
      ]
    }
    // Add more shops if needed
  ]
  

export const shop = [
    {
        _id: '305e9b97-245e-4a17-b8c2-67f0a0883d18',
        shopName: 'Spice Haven',
        shopOwner: 'Michael Rodriguez',
        logo: 'image-6279e2f3a42a550945a90205830815607e5e3424-600x600-webp',
        cover: 'image-9c385527071daa91e2098067f7f0ed00e8380f53-300x240-png',
        description: 'Experience the vibrant flavors of authentic Indian cuisine.',
        address: '789 Maple Avenue, Flavortown, Country',
        longitude: 41.8781,
        longitude: -87.6298,
        isActive: true,
        isPromoted: false,
    },
    {
        _id: '83c6aea5-3121-4e3c-b3c3-b891e7a07381',
        shopName: 'Delicious Bites',
        shopOwner: 'John Doe',
        logo: 'image-68fac1f1050f0354f0f7a446133730b9e6648028-690x690-jpg',
        cover: 'image-272289ac6d1d9719bf239f8ef22094ed0c7106eb-600x360-jpg',
        description: 'Your one-stop shop for electronics',
        address: '123 Main Street, Cityville, Country',
        longitude: 40.7128,
        longitude: -74.006,
        isActive: true,
        isPromoted: false,
    }
]

export const dish = [
    {
        _id: '07d2115c-899c-4db1-a496-90b3491c1ac2',
        dishName: 'Grilled Salmon with Lemon Dill Sauce',
        shop: '305e9b97-245e-4a17-b8c2-67f0a0883d18',
        description: 'Freshly grilled salmon fillet topped with a zesty lemon dill sauce.',
        price: 16.99,
        image: 'image-599fc58300466d0d8fa86a9ae0393846d0205f39-1024x1024-jpg',
        category: '0197e3c8-9fdb-4eda-adff-850e42115eef',
        tags:[
            {
                tag: '09f079cc-cbe7-4a7a-bfc0-43113f011d8a'
            }
        ],
        preparationTime: 25,
        isAvailable: true,
        isPromoted: true,
    }
]