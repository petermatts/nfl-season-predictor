import firebase from 'firebase';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './App.css';
import reducers from './Reducers';
import { StandingsHolder } from './Components/StandingsHolder';
import { WeekHolder } from './Components/WeekHolder';
// import { getSchedule } from './Schedule/ScheduleReader';

import { getGameGrid, getGameList, getSchedule } from './Actions';

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
        <div className="App">
          <header className="App-header">
            NFL Season Predictor
            {/* <button onClick={() => {
              getSchedule(2021);
            }}>
              scrape
            </button> */}
            <button onClick={() => {
              getGameGrid(2021);
              getGameList(2021);
              getSchedule(2021);
            }}>
              get
            </button>
          </header>
          <div className="App-Body">
            <div className="main-section">
              <WeekHolder />
            </div>
            <div className="main-section">
              <StandingsHolder />
            </div>
          </div>
          <footer className="App-Footer" />
        </div>
      </Provider>
    );
  }
}

export default App;
