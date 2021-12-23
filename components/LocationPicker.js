import React,{useState,useEffect} from "react";
import {View,Button,Text,ActivityIndicator,Alert,StyleSheet} from 'react-native';
import Color from "../constants/Color";
import * as Location from 'expo-location';
import MapPreview from "./MapPreview";

const LocationPicker = props =>{
    const [isFetching,setIsFetching] = useState(false);
    const [pickedLocation,setPickedLocation] = useState();
    let mapPickedLocation = props.route.params ? props.route.params.pickedLocation : undefined;

    const {onLocationPicked} = props;
    
    useEffect(()=>{
     if (mapPickedLocation) 
     {
         setPickedLocation(mapPickedLocation);
         onLocationPicked(mapPickedLocation);
    }
    },[mapPickedLocation,onLocationPicked])

    const verifyPermissions = async () =>{
        const result = await Location.requestForegroundPermissionsAsync();
        if(result.status !== 'granted'){
            Alert.alert(
                'Insufficient Permissions',
                'You need to grant location permissions',
                [{text:'Okay'}]
                );
            return false;
        }
        return true;
    }
    const getLocationHandler = async () =>{
       const hasPermission = await verifyPermissions();
       if(!hasPermission) return;

       try{
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            })
            
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
       }catch(err){
           Alert.alert(
               'Warning',"Couldn't fetch location please try again later",
               [{text: 'Okay',style: 'destructive'}]
           )
       }
       setIsFetching(false);
    }
    const pickOnMapHandler = () =>{
        props.navigation.navigate('MapScreen');
    }
    return (
        <View style={styles.locationPicker}>
            <MapPreview style = {styles.mapPreview} location={pickedLocation} >
                {isFetching ? <ActivityIndicator size="large" color={Color.darkSeaGreen} /> : <Text>No location choosen yet!</Text>}
            </MapPreview>
            <View style={styles.actions}>
            <Button 
            title="Get User Location" 
            color={Color.darkSeaGreen}
            onPress={getLocationHandler}
            />
            <Button 
            title="Pick On Map" 
            color={Color.darkSeaGreen}
            onPress={pickOnMapHandler}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    locationPicker:{
        marginBottom: 15,
    },
    mapPreview:{
        marginBottom: 15,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
})

export default LocationPicker;