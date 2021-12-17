import React,{useState} from "react";
import {View,Text,Button,StyleSheet,Image,Alert} from 'react-native';
import Color from "../constants/Color";
import * as ImagePicker from 'expo-image-picker';

var imageData;

const ImgPicker = props =>{
    const [pickedImage,setPickedImage] = useState();
    const takeImageHandler = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if(status !== 'granted'){
            Alert.alert('Warning',"Sorry we can't open the camera without your permission.");
        }
        else {
            imageData = await ImagePicker.launchCameraAsync(
                {
                    allowsEditing: true,
                    aspect: [16,9],
                    //"1" is the highest quality
                    quality: 0.5,
                    
    
                }
            );
            setPickedImage(imageData.uri);
            props.onImageTake(imageData.uri);
        }
    };

    return (
        <View style = {styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ?
                 (<Text> No Image picked yet.</Text> ) : (<Image source={{uri: pickedImage}} style={styles.image} />)
                }
            </View>
            <Button 
                title = "Take Image" 
                color = {Color.darkSeaGreen} 
                onPress = {takeImageHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems:'center',
        marginBottom: 15
    },
    imagePreview:{
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1

    },
    image: {
        width: "100%",
        height:"100%",
    }
})

export default ImgPicker;