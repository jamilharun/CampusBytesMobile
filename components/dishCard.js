import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native"
import ShopScreen from "../screens/app/ShopScreen";
import { urlFor } from "../apis/sanity";
import ShopStack from "../navigation/shopStack";

const DishCard = ({
    isPromoted, 
    dishName, 
    isFeatured, 
    isAvailable,
    preparationTime, 
    _id,
    description,
    price,
    image,
    shop,
    tags}) => { 
        
    const navigation = useNavigation();
    
    return (
            <TouchableWithoutFeedback
            className= 'py-4 first:pt-0 last:pb-0'
            key={_id}
            onPress={()=>{ /*return (<ShopStack _id={shop._id} _type={shop._type} />) */}}>
                <View 
                    style={{
                        // shadowColor: themeColor.bgColor(0.2),
                        shadowRadius: 7
                    }}
                    className=' bg-white rounded-3xl shadow-lg mt-6 first:mt-0 last:pb-5'>
                        <View>
                            <View className='flex flex-row'>
                                <Image 
                                    className=' h-10 w-10 rounded-full'
                                    source={{ uri: urlFor(shop?.logo).url()}}/>
                                <Text className="font-medium text-xl ">{shop?.shopName}</Text>
                            </View>
                            <View>{/* more option icon */}</View>
                        </View>
                        <View>
                            <Image className=' h-44 w-full object-cover rounded-tl-3xl rounded-bl-3xl ' 
                                source={{ uri: urlFor(image).url()}}/>
                            <View className="flex flex-row justify-between mx-4">
                                <View>
                                    <Text className="font-medium text-lg">{dishName}</Text>
                                    <Text className="font-medium text-lg">{price}₱</Text>
                                </View>
                                <Text className='flex flex-col'>
                                    <Text className="font-medium text-lg">{preparationTime}mins</Text>
                                    <Text className="font-medium text-lg">rating</Text>
                                </Text>
                            </View>
                        </View>
                        <View className="flex flex-row mx-4">
                            {
                                tags?.map((tag) => {
                                    return (
                                        <View className="bg-EacColor-SelectiveYellow rounded-sm px-2 mx-2"  key={tag._id}>
                                            <Text className="font-medium text-sm">{tag.tagName}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                </View>
            </TouchableWithoutFeedback>
    )
}
export default DishCard