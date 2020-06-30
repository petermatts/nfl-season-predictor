import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NFL } from './Teams/NFL_Teams';
//import Teams from './Teams/Teams.json';

const logNFL = () => {
  //console.log(Teams);
  console.log(NFL);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" onClick={logNFL()}>
          Log Stuff in console
        </button>
      </header>
    </div>
  );
}

export default App;
