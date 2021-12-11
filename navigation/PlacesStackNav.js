import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import Color from '../constants/Color';

const screenOptions = {
    headerStyle:{
        backgroundColor: Color.darkSeaGreen,
        
    },
    headerTintColor: 'white',
    headerTitleStyle:{
        fontWeight: 'bold',
    }
}

export const PlacesStackNav = props =>{

    const Stack = createStackNavigator();

    return (
    <Stack.Navigator>
        <Stack.Screen 
         name='PlacesListScreen'
         component={PlacesListScreen}
         options={{
             title: 'Places',
             ...screenOptions
         }}
        />
        <Stack.Screen 
         name='PlaceDetailScreen'
         component={PlaceDetailScreen}
         options={{
            title: 'Details',
            ...screenOptions
        }}
        />
        <Stack.Screen 
         name='NewPlaceScreen'
         component={NewPlaceScreen}
         options={{
            title: 'New Place',
            ...screenOptions
        }}
        />
        <Stack.Screen 
         name='MapScreen'
         component={MapScreen}
         options={{
            title: 'Map',
            ...screenOptions
        }}
        />
    </Stack.Navigator>
    )

}

