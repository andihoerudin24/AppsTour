import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import PlacesNavigator from "./navigation/PlaceNavigation";
import placesReducer from "./store/places-reducer";
import {init} from './helpers/db'

init().then(()=>{
  console.log('initial database')
}).catch(err=>{
  console.log('initial db failed')
  console.log(err)
})

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
const App = () => {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
};

export default App;
