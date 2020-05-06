import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PlacesListScreen, { screenOptions } from "../screnns/PlacesListScreen";
import PlacesDetailScreen, {
  screenOptionsPlaceDetail,
} from "../screnns/PlaceDetailScreen";
import NewPlacesScreen, { screenoptions } from "../screnns/NewPlaceScreen";
import MapScreen from "../screnns/MapScreen";
import Color from "../constants/Color";

const Stack = createStackNavigator();

const PlacesNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS == "android" ? Color.primary : "",
          },
          headerTintColor: Platform.OS == "android" ? "white" : Color.primary,
        }}
      >
        <Stack.Screen
          name="Places"
          component={PlacesListScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name="PlaceDetail"
          component={PlacesDetailScreen}
          options={screenOptionsPlaceDetail}
        />
        <Stack.Screen
          name="NewPlace"
          component={NewPlacesScreen}
          options={screenoptions}
        />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigator;
