import * as FileSystem from 'expo-file-system';
export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title,imageUri) =>{
    return async dispatch =>{
        const fileName = imageUri.split('/').pop();
        console.log('file name', fileName);
        const newPath = FileSystem.documentDirectory + fileName;
        try{
            await FileSystem.moveAsync({
                from: imageUri,
                to: newPath
            })
        }catch(err){
            console.log('error from places-action',err);
        }
    
        dispatch(
            {
                type: ADD_PLACE,
                placeData: {
                    title: title,
                    imageUri: newPath
                }
            }
        )
    }
}