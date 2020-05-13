import React, { useState } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Color from "../constants/Color";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-actions";
import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

const NewPlaceScreen = (props) => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setselectedImage] = useState();
  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const imageTakenHandler = imagePath =>{
    setselectedImage(imagePath)
  }

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue,selectedImage));
    props.navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        
        <ImagePicker onImageTake={imageTakenHandler} />

        <LocationPicker navigation={props.navigation} route={props.route} />

        <Button
          title="save place"
          color={Color.primary}
          onPress={savePlaceHandler}
        />
        
      </View>
    </ScrollView>
  );
};

export const screenoptions = (navData) => {
  return {
    headerTitle: "Add Place",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textinput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
