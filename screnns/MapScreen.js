import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
const MapScreen = (props) => {
  const [selectedlocation, setSelectedLocation] = useState();
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandle = (event) => {
    //console.log(event)
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
    //console.log(event.nativeEvent.coordinate.longitude)
  };
  let markerCordinate;
  if (selectedlocation) {
    markerCordinate = {
      latitude: selectedlocation.lat,
      longitude: selectedlocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandle}
    >
      {markerCordinate && (
        <Marker title="Picked Location" coordinate={markerCordinate}></Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
