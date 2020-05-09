import React,{useEffect} from "react";
import { View, Text, StyleSheet, Platform, FlatList} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector,useDispatch } from "react-redux";
import PlaceitemComponent from "../components/placeitem";
import * as placesAction from '../store/places-actions'

const PlacesListScreen = (props) => {
  const place = useSelector((state) => state.places.places);
  const dispacth = useDispatch()

  useEffect(()=>{
    dispacth(placesAction.loadPlaces());
  },[dispacth])

  return (
    <FlatList
      data={place}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceitemComponent
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              navData.navigation.navigate("NewPlace");
            }}
          />
        </HeaderButtons>
      );
    },
  };
};
const styles = StyleSheet.create({});

export default PlacesListScreen;
