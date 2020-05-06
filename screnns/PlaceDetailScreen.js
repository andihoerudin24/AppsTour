import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const PlaceDetailScreen = (props) => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

export const screenOptionsPlaceDetail = (navData) => {
  return {
    headerTitle: navData.route.params.placeTitle,
  };
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
