import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Color";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
//import * as TaskManager from 'expo-task-manager';
//const LOCATION_TASK_NAME = 'background-location-task';
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [pickedLocation, setpickedLocation] = useState();
  // console.log(pickedLocation)
  const [isFetching, setisFetching] = useState(false);

  const mapPickedLocation = props.route.params ? props.route.params.pickedLocation : null

  useEffect(() => {
    if (mapPickedLocation) {
      setpickedLocation(mapPickedLocation)
    }
  }, [mapPickedLocation])

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant loaction permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermissoon = await verifyPermissions();
    if (!hasPermissoon) {
      return;
    }
    try {
      setisFetching(true);
      const loc = await Location.getCurrentPositionAsync({ timeout: 5000 });
      console.log(loc);
      setpickedLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could Not Fetch Location",
        "Please Try Again or Pick a location on the map",
        [
          {
            text: "Okay",
          },
        ]
      );
    }
    setisFetching(false);
  };

  const pickedOnMap = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickedOnMap}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Picked On Map"
          color={Colors.primary}
          onPress={pickedOnMap}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
