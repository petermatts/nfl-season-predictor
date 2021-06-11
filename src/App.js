import firebase from 'firebase';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './Reducers';
import { AppHome } from './AppHome';

var firebaseConfig = {
  apiKey: "AIzaSyCzTqMNe7U5CrBWVI2YE3rnAxKuABqxHf8",
  authDomain: "nfl-season-predictor.firebaseapp.com",
  databaseURL: "https://nfl-season-predictor-default-rtdb.firebaseio.com",
  projectId: "nfl-season-predictor",
  storageBucket: "nfl-season-predictor.appspot.com",
  messagingSenderId: "5313500236",
  appId: "1:5313500236:web:b75bbe1f4442efdc5790e9",
  measurementId: "G-0E1Z17XKGW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

class App extends Component {

  render() {
    const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)));

    return (
      <Provider store={store}>
        <AppHome />
      </Provider>
    );
  }
}

export default App;
