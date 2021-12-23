import React,{useLayoutEffect,useEffect} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList
} from 'react-native';
import {CustomHeaderButton} from '../components/CustomHeaderButton'
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import PlaceItem from '../components/PlaceItem';
import { useSelector,useDispatch } from 'react-redux';
import * as PlacesAction from '../store/actions/Places-action'

const PlacesListScreen = props =>{

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(PlacesAction.fetchAllPlace());
    },[dispatch])

    const places = useSelector((state) => state.places.places);
    useLayoutEffect(() =>{
        props.navigation.setOptions({
            headerRight: () =>{
                return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                    <Item 
                     title='add'
                     iconName='md-add'
                     iconSize={40}
                     color='white'
                     onPress={() => {props.navigation.navigate('NewPlaceScreen')}}
                    />
                </HeaderButtons>
                )
            }
        })
    })

    return(
        <FlatList 
         data={places}
         keyExtractor={(item,index) => item.id}
         renderItem={(itemData) => {
         return (
         <PlaceItem
            image = {itemData.item.imageUri}
            title = {itemData.item.title}
            address = {null}
            onSelect = {() => {
                props.navigation.navigate({
                    name:'PlaceDetailScreen',
                    params:{
                        id: itemData.item.id
                    }})
            }}
        />
        )
    }
            }
        />
    );
}

const styles = StyleSheet.create({

})

export default PlacesListScreen;

