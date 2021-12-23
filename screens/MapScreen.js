import React,{useState,useLayoutEffect,useEffect,useCallback, useRef} from 'react';
import MapView,{Marker} from 'react-native-maps';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const MapScreen = props =>{
    const [render,setRender] = useState(false);
    var selectedLocation = useRef({lat:undefined,lng:undefined});


    const mapRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
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