import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Color from "../constants/Color";

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

  const savePicekdLocation = useCallback(() => {
    if (!selectedlocation) {
      return
    }
    props.navigation.navigate({
      name: 'NewPlace',
      params: { pickedLocation: selectedlocation }
    })
  }, [selectedlocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePicekdLocation });
  }, [savePicekdLocation]);

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

export const Mapscreenoptions = (navData) => {
  const saveFn = navData.route.params
    ? navData.route.params.saveLocation
    : null;
  return {
    headerRight: () => {
      return (
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Color.primary,
  },
});

export default MapScreen;
