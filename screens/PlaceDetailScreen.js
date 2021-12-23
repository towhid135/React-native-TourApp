import React,{useLayoutEffect} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList
} from 'react-native';
import {useSelector} from 'react-redux';
import MapView,{Marker} from 'react-native-maps';

const PlaceDetailScreen = props =>{
    const selectedPlaceId = props.route.params.id;
    const selectedPlaceData = useSelector((state) => {
        return (
            state.places.places.find((item) => selectedPlaceId === item.id)
        )
    })

    useLayoutEffect(()=>{
        props.navigation.setOptions({
            title: selectedPlaceData.title
        })
    })

    const mapRegion = {
        latitude: selectedPlaceData.lat,
        longitude: selectedPlaceData.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    const markerCoordinate = {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
    }

    return(
        <View style={styles.container} >
            <MapView 
            style={styles.map} 
            region={mapRegion}
            >
                <Marker
                 title='Area Location'
                 coordinate={markerCoordinate}
                >

                </Marker>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 200,
    },
    map: {
        width: '100%',
        height: 250,
    }
})

export default PlaceDetailScreen;