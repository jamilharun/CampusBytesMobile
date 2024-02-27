export const fetchAllDishes = `*[_type == "dish" && isAvailable&& !(_id in path("drafts.**"))]{
    isPromoted,
    dishName,
    isFeatured,
    isAvailable,
    preparationTime,
    _id,
    description,
    _type,
    price,
    image,
    shop->{
      _id,
      logo,
      shopName
    },
    tags[]->{
      _id,
      tagName,
      color
    }
  }`;

//query for fetching all shops
export const qfas = `*[_type == "shop" && isActive &&!(_id in path("drafts.**"))]{
  _type,
  _id,
  isPromoted,
  description,
  isActive,
  logo,
  slug,
  shopOwner,
  cover,
  isFeatured,
  longitude,
  latitude,
  shopName,
  tags[]->{
    _id,
    tagName,
    color
  }
}`;

//inverse fetch 
// yeahh boiiii
export const qfsdf = (id) => {
  const query = `*[_type == "shop" && _id == ${id} && isActive &&!(_id in path("drafts.**"))]{
    _type,
    _id,
    isPromoted,
    description,
    isActive,
    logo,
    slug,
    shopOwner,
    cover,
    isFeatured,
    longitude,
    latitude,
    shopName,
    tags[]->{
      _id,
      tagName,
      color
    },
    "products": *[_type == 'product' && isAvailable && !(_id in path("drafts.**")) && shop._ref == ^._id] {
      _id,
      productName,
      slug,
      tags[]->{
        _id,
        tagName,
        color
      },
      image,
      Price,
      description,
      isFeatured,
      isAvailable,
      isPromoted,
      _type,
    },
    "dishes": *[_type == "dish" && isAvailable && !(_id in path("drafts.**")) && shop._ref == ^._id ] {
      isPromoted,
      dishName,
      isFeatured,
      isAvailable,
      preparationTime,
      _id,
      description,
      _type,
      price,
      image,
      tags[]->{
        _id,
        tagName,
        color
      }
    }
  }`;
  return query;
}


// reusable code

// fetching sorted data
// `*[_type == 'product'] | order(shopName->shopName asc) {
//   isAvailable,
//   description,
//   shopName->{
//     _id,
//     shopName,
//   },
//   productName,
//   image,
//   category,
//   Price
//}`;


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
