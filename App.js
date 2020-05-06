import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import PlacesNavigator from "./navigation/PlaceNavigation";
import placesReducer from "./store/places-reducer";

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
