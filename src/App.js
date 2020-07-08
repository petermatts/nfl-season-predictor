import React from 'react';
import { Button,  Container } from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import { NFL } from './Teams/NFL_Teams';
import { schedule as Schedule2020 } from './Schedule/2020';
import { GameButton } from './Components/GameButton';

const logNFL = () => {
  console.log(NFL);
  console.log(Schedule2020);
};

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
  console.log(Container);
    return (
      <div className="App">
        <header className="App-header">
          {/* <Container className="themed-container" fluid={true}> */}
            NFL Season Predictor
          {/* </Container> */}
        </header>
        <div className="App-Body">
          <GameButton game={Schedule2020.week1.games[0]}/>
          <GameButton game={Schedule2020.week1.games[1]}/>
          <GameButton game={Schedule2020.week1.games[2]}/>
          <GameButton game={Schedule2020.week1.games[3]}/>
          <GameButton game={Schedule2020.week1.games[4]}/>
          <GameButton game={Schedule2020.week1.games[5]}/>
          <GameButton game={Schedule2020.week1.games[6]}/>
        </div>
        <footer className="App-Footer"/>
      </div>
    );
}

export default App;
