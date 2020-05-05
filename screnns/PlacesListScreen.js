import React from 'react'
import {View,Text,StyleSheet,Platform} from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../components/HeaderButton'

const PlacesListScreen = props =>{
    return(
        <View>
            <Text>PlacesListScreen</Text>
        </View>
    )
}

export const screenOptions = navData =>{
    return {
        headerTitle: 'All Places',
        headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                  onPress={() => {
                      navData.navigation.navigate('Cart')
                  }}
                />
              </HeaderButtons>
            );
          }
    }
}
const styles = StyleSheet.create({

})

export default PlacesListScreen