import React,{useLayoutEffect} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList
} from 'react-native';

const PlaceDetailScreen = props =>{
    useLayoutEffect(()=>{
        props.navigation.setOptions({
            title: props.route.params.title
        })
    })
    return(
        <View>
            <Text>
                Place Details Screen
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    
})

export default PlaceDetailScreen;