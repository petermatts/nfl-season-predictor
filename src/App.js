import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './App.css';
import reducers from './Reducers';
import { StandingsHolder } from './Components/StandingsHolder';
import { WeekHolder } from './Components/WeekHolder';
import { getSchedule } from './Schedule/ScheduleReader';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)));

    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            NFL Season Predictor
            <button onClick={() => {
              getSchedule(2021);
            }}>
              scrape
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
