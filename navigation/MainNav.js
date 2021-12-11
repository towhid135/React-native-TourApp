import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { PlacesStackNav } from './PlacesStackNav';

export const MainNav = props =>{
    return(
        <NavigationContainer>
            <PlacesStackNav />
        </NavigationContainer>
    )
}