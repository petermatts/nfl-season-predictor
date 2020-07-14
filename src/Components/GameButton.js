import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import './GameButton.css';
import '../Teams/TeamColors.css';
import { gameResult } from './../Actions';
import { bindActionCreators } from 'redux';

// const GameSelector = ({ game }) => {
//     const hometeam = Object.values(game.home)[0];
//     const awayteam = Object.values(game.away)[0];

//     return (
//         <div className="Group">
//             <div>
//                 <small>{game.time}</small>
//             </div>
//             <ButtonGroup>
//                 <button 
//                     className={`HomeTeam-Button ${hometeam}`}
//                     onClick={this.props.gameResult('hey there')}
//                 >
//                     {hometeam}
//                 </button>
//                 <button 
//                     className="Tie-Button"
//                     onClick={gameResult('Tie')}
//                 >
//                     Tie
//                 </button>
//                 <button
//                     className={`AwayTeam-Button ${awayteam}`}
//                     onClick={gameResult()}
//                 >
//                     {awayteam}
//                 </button>
//             </ButtonGroup>
//         </div>
//     );
// };

class GameSelector extends Component {
    render() {
        const { game } = this.props; 
        const hometeam = Object.values(game.home)[0];
        const awayteam = Object.values(game.away)[0];
    
        return (
            <div className="Group">
                <div>
                    <small>{game.time}</small>
                </div>
                <ButtonGroup>
                    <button 
                        className={`HomeTeam-Button ${hometeam}`}
                        onClick={() => this.props.gameResult('hey there')}
                    >
                        {hometeam}
                    </button>
                    <button 
                        className="Tie-Button"
                        onClick={() => this.props.gameResult('Tie')}
                    >
                        Tie
                    </button>
                    <button
                        className={`AwayTeam-Button ${awayteam}`}
                        onClick={() => this.props.gameResult()}
                    >
                        {awayteam}
                    </button>
                </ButtonGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { NFL } = state;
    return { NFL }; 
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const boundActions = bindActionCreators({ gameResult }, dispatch);
    return {
        gameResult: () => dispatch(gameResult()),
        ...boundActions,
        dispatch
    }
};

const GameButton = connect(mapStateToProps, mapDispatchToProps)(GameSelector);
export { GameButton };