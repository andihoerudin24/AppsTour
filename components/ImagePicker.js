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
import ImagePicker from "react-native-image-crop-picker";
import OpenAppSettings from "react-native-app-settings";

const ImagePickers = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const takeImageHandler = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.5,
      });
      setPickedImage(image.path);
    } catch (error) {
      if (error) {
        OpenAppSettings.open();
      }
    }
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
    marginBottom: 10,
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
