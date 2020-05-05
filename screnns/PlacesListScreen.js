import React from 'react'
import {View,Text,StyleSheet,Platform} from 'react-native'
import HeaderButton from '../components/HeaderButton'

const PlacesListScreen = props =>{
    return(
        <View>
            <Text>PlacesListScreen</Text>
        </View>
    )
}

PlacesListScreen.navigationOptions= navData =>{
    return {
        headerTitle: 'All Places',
        headerRight: () => (
            <HeaderButton HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add Place"
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => {
                    navData.navigation.navigate('NewPlace');
                }}
              />
            </HeaderButton>
          )
    }
}

const styles = StyleSheet.create({

})

export default PlacesListScreen