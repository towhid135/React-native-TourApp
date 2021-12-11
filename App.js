import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MainNav } from './navigation/MainNav';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import PlacesReducer from './store/reducers/Places-reducer';

export default function App() {

  const rootReducer = combineReducers({
    places: PlacesReducer
  });

  const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

  return (
    <Provider store={store} >
      <MainNav />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
