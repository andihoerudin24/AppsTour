import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Alert,
} from "react-native";
import Color from "../constants/Color";
//import ImagePicker from "react-native-image-crop-picker";
import * as ImagePicker from "expo-image-picker";
//import OpenAppSettings from "react-native-app-settings";

const ImagePickers = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const verifyPermissions = async () => {
    try {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ]);
      if (result) {
        //console.log(result);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    props.onImageTake(image.uri);
  };

  return (
    <View style={styles.imagesPicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No Image Picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Color.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagesPicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePickers;
