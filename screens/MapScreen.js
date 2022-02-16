import React,{useState,useLayoutEffect,useEffect,useCallback, useRef} from 'react';
import MapView,{Marker} from 'react-native-maps';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import * as Location from 'expo-location';

const MapScreen = props =>{
    const [render,setRender] = useState(false);
    var selectedLocation = useRef({lat:undefined,lng:undefined});

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

    useEffect(()=>{
        const getLocation = async () =>{
        const hasPermission = await verifyPermissions();
        if(!hasPermission) return;
 
        try{
             
             const location = await Location.getCurrentPositionAsync({
                 timeout: 5000
             })
             //console.log('location from location picker',location);
             selectedLocation.current = {
                 lat: location.coords.latitude,
                 lng: location.coords.longitude
             };
        }catch(err){
            Alert.alert(
                'Warning',"Couldn't fetch location please try again later",
                [{text: 'Okay',style: 'destructive'}]
            )
        }
    }
    getLocation();
  },[])

    const mapRegion = {
        latitude: selectedLocation.current.lat,
        longitude: selectedLocation.current.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

    let markerCoordinate;
    if(selectedLocation.current.lat !== undefined){
        markerCoordinate = {
            latitude: selectedLocation.current.lat,
            longitude: selectedLocation.current.lng
        }
    }

    const selectLocationHandler =  event =>{
        const choosedLocation = {
            lat:  event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        }
        selectedLocation.current = choosedLocation;
        setRender(!render);
    }

    //start
    const savePickedLocationHandler = useCallback(() => {
        props.navigation.navigate('NewPlaceScreen', { pickedLocation: selectedLocation.current });
      }, [selectedLocation]);
    
    
    useLayoutEffect(()=>{
        
        props.navigation.setOptions({
            headerRight: () =>{
                return (
                    <TouchableOpacity style={styles.touchStyle} onPress={savePickedLocationHandler}>
                        <Text style={styles.textStyle}>Save</Text>
                    </TouchableOpacity>
                )
            }
        })
    },[])

    return(
        <MapView 
         style = {styles.map}
         region={mapRegion}
         onPress={selectLocationHandler}
        >
         {
         markerCoordinate && <Marker 
          title='Picked Location'
          coordinate={markerCoordinate}
         >
        </Marker>
        }

        </MapView>
    );
}

const styles = StyleSheet.create({
    map:{
        flex:1,
    },
    touchStyle:{
       marginHorizontal: 20
    },
    textStyle:{
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})
export default MapScreen;