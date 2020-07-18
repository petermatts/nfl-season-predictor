import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './App.css';
import { WeekPicker } from './Components/WeekPicker';
import reducers from './Reducers';
import { Standings } from './Components/Standings';
import { WeekHolder } from './Components/WeekHolder';

import { sortDivision } from './Actions/SortStandings';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p> */}
//         <Button color="primary" onClick={logNFL}>
//           Log
//         </Button>
//         <GameButton />
//       </header>
//     </div>
//   );
// }

// function App() {
//   console.log(NFL);
//   console.log(Schedule2020);
//   return (
//     <div className="App">
//       <header className="App-header">
//         NFL Season Predictor
//       </header>
//       <div className="App-Body">
//         <WeekPicker games={Schedule2020.week1.games} byes={Schedule2020.week1.byes}/>
//       </div>
//       {/* <Standings confrence="AFC" division="East" /> */}
//       <footer className="App-Footer"/>
//     </div>
//   );
// }

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
            {/* <WeekPicker games={Schedule2020.week1.games} byes={Schedule2020.week1.byes}/> */}
            <WeekHolder />
          </div>
          {/* <Standings confrence="AFC" /> */}
          <footer className="App-Footer"/>
        </div>
      </Provider>
    );
  }
}

export default App;
