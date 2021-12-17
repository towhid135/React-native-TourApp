import * as FileSystem from 'expo-file-system';
import { insertPlace } from '../../sqliteDB/db';
export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title,imageUri) =>{
    return async dispatch =>{
        const fileName = imageUri.split('/').pop();
        //console.log('file name', fileName);
        const newPath = FileSystem.documentDirectory + fileName;
        try{
            await FileSystem.moveAsync({
                from: imageUri,
                to: newPath
            })
            const dbResult = await insertPlace(title,newPath,'dummy address',15.6,12.3);
            //console.log('db result from places action',dbResult.rows.WebSQLRows.array);

            dispatch(
                {
                    type: ADD_PLACE,
                    placeData: {
                        id: dbResult.insertId,
                        title: title,
                        imageUri: newPath
                    }
                }
            )

        }catch(err){
            console.log('error from places-action',err);
        }
    
    }
}