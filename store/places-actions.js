import { Asset, Constants, FileSystem, Permissions } from 'react-native-unimodules';
export const ADD_PLACE = 'ADD_PLACE';
export const addPlace = (title, image) => {
  return async dispatch => {
    console.log(image)
    const fileName = image.split('/').pop();
    console.log('file',fileName)
    const newPath =  FileSystem.documentDirectory + fileName;
    console.log('new',newPath);
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
    dispatch({ type: ADD_PLACE, placeData: { title: title, image: newPath } });
  };
};
