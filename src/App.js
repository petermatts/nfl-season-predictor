import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './App.css';
import reducers from './Reducers';
import { Standings } from './Components/Standings';
import { StandingsHolder } from './Components/StandingsHolder';
import { WeekHolder } from './Components/WeekHolder';

import { sortDivision } from './Actions/SortStandings';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)));

    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            NFL Season Predictor
          </header>
          <div className="App-Body">
            <WeekHolder />
            <StandingsHolder />
          </div>
          {/* <Standings confrence="AFC" /> */}
          <footer className="App-Footer"/>
        </div>
      </Provider>
    );
  }
}

export default App;
