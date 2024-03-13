// import * as ImagePicker from 'expo-image-picker';

// export const pickImage = async () => {
//     const { status } = await ImagePicker
//         .requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//         console.error('Permission to access media library was denied');
//     }
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
// };