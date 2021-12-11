import React,{useState} from 'react';
import Color from '../constants/Color';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/actions/Places-action'
const NewPlaceScreen = props =>{
    const dispatch = useDispatch();
    const [textValue,setTextValue] = useState('');
    const textInputHandler = text =>{
        setTextValue(text);
    }
    const savePlaceHandler = () =>{
        dispatch(placesActions.addPlace(textValue));
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