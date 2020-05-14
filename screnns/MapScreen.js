import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  YellowBox
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Color from "../constants/Color";

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const MapScreen = (props) => {
  const initialLocation =  props.route.params ? props.route.params.initialLocation : null
  const readonly =  props.route.params ? props.route.params.readonly : null
  const [selectedlocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandle = (event) => {
    //console.log(event)
    if(readonly){
       return;
    } 
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
  const readonly =  navData.route.params ? navData.route.params.readonly : null 
  if(readonly){
     return{};
  }
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
