import React from "react";
import {HeaderButton,HeaderButtons,Item} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';

export const CustomHeaderButton = props =>{
    return(
        <HeaderButton
         {...props}
         IconComponent={Ionicons}
        />
    )
}