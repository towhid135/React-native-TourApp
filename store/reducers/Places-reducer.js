import { ADD_PLACE } from "../actions/Places-action";
import Place from "../../models/place";
const initialState = {
    places: []
}

export default (state=initialState,action) =>{
    switch(action.type){
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.imageUri
            )
        return {places: state.places.concat(newPlace)}

        default:
            return state;
    }
}