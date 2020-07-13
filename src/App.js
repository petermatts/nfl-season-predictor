import React from 'react';
import './App.css';
import { NFL } from './Teams/NFL_Teams';
import { schedule as Schedule2020 } from './Schedule/2020';
import { WeekPicker } from './Components/WeekPicker';



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

function App() {
  console.log(NFL);
  console.log(Schedule2020);
  return (
    <div className="App">
      <header className="App-header">
        NFL Season Predictor
      </header>
      <div className="App-Body">
        <WeekPicker games={Schedule2020.week1.games} byes={Schedule2020.week1.byes}/>
      </div>
      {/* <Standings confrence="AFC" division="East" /> */}
      <footer className="App-Footer"/>
    </div>
  );
}

export default App;
