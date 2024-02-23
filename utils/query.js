// export const fetchingCategoryQuery = `*[_type == 'category'] {
//     _id,
//     categoryName,
//     _createdAt,
//     image{
//       asset{
//         _ref
//       }
//     },
//     description
//   }`;

// export const fetchingProductQuery = `*[_type == 'product'] {
//   image{
//     asset{
//       _ref
//     }
//   },
//   isAvailable,
//   productName,
//   category->{
//     _id,
//     categoryName,
//   },
//   _updatedAt,
//   Price,
//   description,
//   shopName->{
//     _id,
//     shopName,
//     shopOwner->{
//       _id,
//       name
//     }
//   },
//   _id,
// }`;

// //inverse fetch 
// // yeahh boiiii
// export const fetchingProdDish = `*[_type == 'shop'] {
//   _id,
//   shopName,
//   description,
//   address,
//   logo{
//     asset{
//       _ref
//     }
//   },
//   cover{
//     asset{
//       _ref
//     }
//   },
//   longitude,
//   latitude,
//   isVerified,
//   isActive,
//   "products": *[_type == 'product' && shopName._ref == ^._id] {
//     _id,
//     productName,
//     category->{
//       _id,
//       categoryName,
//       description
//     },
//     tags[]->{
//     _id,
//     tagName,
//     description
//     },
//     image,
//     Price,
//     description,
//     isAvailable,
//     _createdAt
//   },
//   "dishes": *[ _type == 'dish' && shopName._ref == ^._id ] {
//   _id,
//   dishName,
//   shopName{
//     _ref
//   },
//   preparationMethod,
//   category->{
//       _id,
//       categoryName,
//       description
//   },
//   tags[]->{
//     _id,
//     tagName,
//     description
//   },
//   image,
//   Price,
//   description,
//   isAvailable,
//   _createdAt,
// }
// }`


// // reusable code

// // fetching sorted data
// // `*[_type == 'product'] | order(shopName->shopName asc) {
// //   isAvailable,
// //   description,
// //   shopName->{
// //     _id,
// //     shopName,
// //   },
// //   productName,
// //   image,
// //   category,
// //   Price
// //}`;


// // *[_type == 'shop'] {
// //   _id,
// //   shopName,
// //   "products": *[_type == 'product' && shopName._ref == ^.id] {
// //     isAvailable,
// //     description,
// //     productName,
// //     image,
// //     category,
// //     Price
// //   }
// // }