import React from "react";
import {View,Image,StyleSheet,TouchableOpacity} from 'react-native';
import Env from '../env';

const MapPreview = props =>{
    //The url should be kept in a single line, otherwise it will not work.
    /*We have to replace the "center=" from the url with our latitude & longitude.
    we can also change "zoom=,size=,maptype & markers from the url accordings to our needs" */
    let imagePreviewUrl;
    try{
        if (props.location) imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${Env.googleApiKey}`;
    }catch(err){
        console.log('map image error: ',err);
    }
    //console.log(imagePreviewUrl);
    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.mapPreview,...props.style}}>
            {props.location ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl}} /> : props.children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mapPreview:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
})

export default MapPreview;