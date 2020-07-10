import React from 'react';
import { Container } from 'reactstrap';
import './App.css';
//import { NFL } from './Teams/NFL_Teams';
import { schedule as Schedule2020 } from './Schedule/2020';
import { GameButton } from './Components/GameButton';
import { Standings } from './Components/Standings';

// const logNFL = () => {
//   console.log(NFL);
//   console.log(Schedule2020);
// };

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
          {/* <GameButton game={Schedule2020.week1.games[1]}/>
          <GameButton game={Schedule2020.week1.games[2]}/>
          <GameButton game={Schedule2020.week1.games[3]}/>
          <GameButton game={Schedule2020.week1.games[4]}/>
          <GameButton game={Schedule2020.week1.games[5]}/>
          <GameButton game={Schedule2020.week1.games[6]}/>
          <GameButton game={Schedule2020.week1.games[7]}/>
          <GameButton game={Schedule2020.week1.games[8]}/>
          <GameButton game={Schedule2020.week1.games[9]}/>
          <GameButton game={Schedule2020.week1.games[10]}/>
          <GameButton game={Schedule2020.week1.games[11]}/>
          <GameButton game={Schedule2020.week1.games[12]}/>
          <GameButton game={Schedule2020.week1.games[13]}/>
          <GameButton game={Schedule2020.week1.games[14]}/>
          <GameButton game={Schedule2020.week1.games[15]}/> */}
        </div>
        <Standings confrence="AFC" division="East" />
        <footer className="App-Footer"/>
      </div>
    );
}

export default App;
