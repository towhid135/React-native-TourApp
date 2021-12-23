import React,{useState,useCallback} from 'react';
import Color from '../constants/Color';
import ImgPicker from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';

import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/actions/Places-action';

const NewPlaceScreen = props =>{
    const dispatch = useDispatch();
    const [selectedImage,setSelectedImage] = useState();
    const [textValue,setTextValue] = useState('');
    const [selectedLocation,setSelectedLocation] = useState();
    const textInputHandler = text =>{
        setTextValue(text);
    }

    const onImageTakeHandler = imageUri =>{
        setSelectedImage(imageUri);
    }

    const locationPickedHandler = useCallback( location =>{
        //console.log('location from new place',location);
        setSelectedLocation(location);
    },[])

    const savePlaceHandler = () =>{
        dispatch(placesActions.addPlace(textValue,selectedImage,selectedLocation));
        props.navigation.goBack();
    }

    return(
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                style={styles.textInput}
                value= {textValue}
                onChangeText={textInputHandler}
                />
                <ImgPicker 
                 onImageTake = {onImageTakeHandler}
                />
                <LocationPicker
                 navigation = {props.navigation}
                 route = {props.route}
                 onLocationPicked = {locationPickedHandler}
                />
                <Button 
                title='Submit' 
                color={Color.darkSeaGreen}
                onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form:{
        margin:30,
    },
    label:{
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    }
})

export default NewPlaceScreen;