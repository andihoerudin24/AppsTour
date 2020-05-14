import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import MapPreview from "../components/MapPreview";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import HeaderButton from "../components/HeaderButton";
import Color from "../constants/Color";

const PlaceDetailScreen = (props) => {
  const placeId = props.route.params.placeId;
  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng }

  const showMpasHandler = () => {
      props.navigation.navigate('Map',{readonly:true,initialLocation:selectedLocation})
  }

  return (
    <ScrollView contentContainerStyle={{alignItems:'center'}}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.MapPreview}
          location={selectedLocation}
          onPress={showMpasHandler}
        />
      </View>
    </ScrollView>
  );
};

export const screenOptionsPlaceDetail = (navData) => {
  return {
    headerTitle: navData.route.params.placeTitle,
  };
};

const styles = StyleSheet.create({
   image:{
     height:'35%',
     width:'100%',
     minHeight:300,
     backgroundColor:'#ccc'
   },
   locationContainer:{
     marginVertical:20,
     width:'90%',
     maxWidth:350,
     justifyContent:'center',
     alignItems:'center',
     shadowColor:'black',
     shadowOpacity:0.26,
     shadowOffset:{width:0,height:2},
     shadowRadius:8,
     elevation:5,
     backgroundColor:'white',
     borderRadius:10,
   },
   addressContainer:{
     padding:20
   },
   address:{
     color:Color.primary,
     textAlign:'center'
   },
   MapPreview:{
     width:'100%',
     maxWidth:350,
     height:300,
     borderBottomLeftRadius:10,
     borderBottomRightRadius:10
   }
});

export default PlaceDetailScreen;
