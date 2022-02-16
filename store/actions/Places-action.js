import * as FileSystem from 'expo-file-system';
import { insertPlace,fetchPlaces } from '../../sqliteDB/db';
export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACE = "FETCH_PLACE";
import vars from '../../env';

export const addPlace = (title,imageUri, location) =>{
    return async dispatch =>{
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&amp;key=${vars.googleApiKey}`);
        if(!response.ok){
            //console.log('error occurs on fetching address from addPlace action');
            return;
        }

        const resData = await response.json();
        //const address = resData.results[0].formatted_address; 
        //console.log(resData);

        const fileName = imageUri.split('/').pop();
        //console.log('file name', fileName);
        const newPath = FileSystem.documentDirectory + fileName;
        try{
            await FileSystem.moveAsync({
                from: imageUri,
                to: newPath
            })
            const dbResult = await insertPlace(
                title,
                newPath,
                'dummy address',
                location.lat,
                location.lng
                );
            //console.log('db result from places action',dbResult.rows.WebSQLRows.array);

            dispatch(
                {
                    type: ADD_PLACE,
                    placeData: {
                        id: dbResult.insertId,
                        title: title,
                        imageUri: newPath,
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            )

        }catch(err){
            //console.log('error from places-action',err);
        }
    
    }
}

export const fetchAllPlace = () =>{
    return async dispatch => {
        const dbResult = await fetchPlaces();
        //console.log('db result from places action',dbResult.rows._array);

        dispatch({type: FETCH_PLACE, places: dbResult.rows._array})
    }
}